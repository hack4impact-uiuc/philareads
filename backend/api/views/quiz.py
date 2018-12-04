from flask import Flask, jsonify, request, Blueprint, json
import datetime
import pdb
import jwt
from api.models import (
    Quiz,
    Question,
    db,
    Book,
    User,
    QuestionResult,
    QuizResult,
    Badge,
    give_user_badges,
)
from api.core import (
    create_response,
    serialize_list,
    logger,
    invalid_model_helper,
    admin_route,
)

quiz = Blueprint("quiz", __name__)


def invalid_question_result_data(user_data):
    return invalid_model_helper(
        user_data, ["user_answer", "correct_answer", "correct", "question_num"]
    )


def invalid_quiz_result_data(user_data):
    return invalid_model_helper(
        user_data,
        ["quiz_id", "num_correct", "num_total", "date_taken", "attempted_questions"],
    )


def invalid_quiz_data(user_data):
    return invalid_model_helper(user_data, ["name", "questions", "book_id"])


# returns true if another quiz has the same name, and belongs to the same book
def duplicate_quiz(user_data):
    book = Book.query.filter_by(id=user_data["book_id"]).first()

    for quiz in book.quizzes:
        if user_data["name"] == quiz.name:
            return True

    return False


def create_quiz_helper(user_data):
    if invalid_quiz_data(user_data):
        return dict(
            message="Missing required quiz information",
            status=422,
            data={"status": "fail"},
        )

    linked_book = Book.query.get(user_data["book_id"])
    if linked_book is None:
        return dict(message="Book not found", status=422, data={"status": "fail"})

    if duplicate_quiz(user_data):
        return dict(data={"status": "fail"}, message="Quiz already exists.", status=409)

    new_quiz = Quiz(user_data["name"])
    new_quiz.book_id = linked_book.id
    linked_book.quizzes.append(new_quiz)

    # write into database so that new_quiz has a PK
    db.session.add(new_quiz)
    db.session.commit()

    for q in user_data["questions"]:
        db_ques = Question(q["text"], q["options"], q["correct_option"])
        db_ques.quiz_id = new_quiz.id
        new_quiz.questions.append(db_ques)
        db.session.add(db_ques)

    db.session.commit()

    return dict(
        message="Succesfully created new quiz", status=200, data={"status": "success"}
    )


@quiz.route("/quiz", methods=["POST"])
def create_quiz():
    res = create_quiz_helper(request.get_json())
    return create_response(
        message=res["message"], status=res["status"], data=res["data"]
    )


@quiz.route("/quiz_results", methods=["GET"])
def get_quiz_results():
    try:
        user_id = User.decode_auth_token(request.cookies.get("jwt"))
    except jwt.ExpiredSignatureError:
        return create_response(
            message="Expired token", status=401, data={"status": "fail"}
        )
    except jwt.InvalidTokenError:
        return create_response(
            message="Invalid token", status=401, data={"status": "fail"}
        )
    user = User.query.filter_by(id=user_id).first()

    # invalid user
    if user is None:
        return create_response(
            message="User not found", status=200, data={"status": "fail"}
        )

    quizList = []

    for qr in user.attempted_quizzes:
        temp_quiz = {}
        temp_quiz["quiz_result_id"] = qr.id
        temp_quiz["num_correct"] = qr.num_correct
        temp_quiz["num_total"] = qr.num_total
        temp_quiz["date_taken"] = qr.date_taken
        quiz = Quiz.query.filter_by(id=qr.quiz_id).first()
        temp_quiz["book_id"] = quiz.book_id
        book = Book.query.filter_by(id=quiz.book_id).first()
        temp_quiz["book_name"] = book.name
        temp_quiz["quiz_name"] = quiz.name
        quizList.append(temp_quiz)

    return create_response(
        message="Succesfully returned quiz results",
        status=200,
        data={"quizzes": quizList},
    )


@quiz.route("/<quiz_result_id>/question_results", methods=["GET"])
def get_question_results(quiz_result_id):
    try:
        user_id_from_token = User.decode_auth_token(request.cookies.get("jwt"))
    except jwt.ExpiredSignatureError:
        return create_response(
            message="Expired token", status=401, data={"status": "fail"}
        )
    except jwt.InvalidTokenError:
        return create_response(
            message="Invalid token", status=401, data={"status": "fail"}
        )

    quiz_result = QuizResult.query.filter_by(id=quiz_result_id).first()
    if quiz_result is None:
        return create_response(
            message="Invalid quiz result id", status=200, data={"status": "fail"}
        )

    if quiz_result.user_id is not user_id_from_token:
        return create_response(
            message="Invalid request, user should not this quiz result",
            status=200,
            data={"status": "fail"},
        )

    quest_list = []
    quiz_questions = Quiz.query.get(quiz_result.quiz_id).questions
    for attempt_quest in quiz_result.attempted_questions:
        quest_dict = {}
        quest_dict["user_answer"] = attempt_quest.user_answer
        quest_dict["correct_answer"] = attempt_quest.correct_answer
        quest_dict["correct"] = attempt_quest.correct
        # grab the original question options
        question = Question.query.filter_by(id=attempt_quest.id).first()
        quest_dict["question_options"] = quiz_questions[
            attempt_quest.question_num
        ].options
        quest_list.append(quest_dict)

    return create_response(
        message="Succesfully returned quiz results",
        status=200,
        data={"questions": quest_list},
    )


def create_question_result(new_quiz_result, user_data):
    new_question_result = QuestionResult(
        user_data["user_answer"],
        user_data["correct_answer"],
        user_data["question_num"],
        user_data["correct"],
    )
    new_question_result.quiz_result_id = new_quiz_result.id
    new_quiz_result.attempted_questions.append(new_question_result)
    return new_question_result


@quiz.route("/quiz_result", methods=["POST"])
def create_quiz_result():
    try:
        user_id = User.decode_auth_token(request.cookies.get("jwt"))
    except jwt.ExpiredSignatureError:
        return create_response(
            message="Expired token", status=401, data={"status": "fail"}
        )
    except jwt.InvalidTokenError:
        return create_response(
            message="Invalid token", status=401, data={"status": "fail"}
        )

    user_data = request.get_json()
    if invalid_quiz_result_data(user_data):
        return create_response(
            message="Missing required quiz result information",
            status=422,
            data={"status": "fail"},
        )

    python_date = datetime.datetime.strptime(
        user_data["date_taken"], "%Y-%m-%dT%H:%M:%S.%fZ"
    )
    dup_quiz_result = (
        QuizResult.query.filter_by(date_taken=python_date)
        .filter_by(user_id=user_id)
        .filter_by(quiz_id=user_data["quiz_id"])
        .first()
    )
    if dup_quiz_result is not None:
        return create_response(
            data={"status": "fail"}, message="Quiz result already exists.", status=409
        )

    user = User.query.get(user_id)

    new_quiz_result = QuizResult(
        user_id,
        user_data["quiz_id"],
        user_data["num_correct"],
        user_data["num_total"],
        python_date,
    )
    db.session.add(new_quiz_result)
    db.session.commit()

    for ques_res_data in user_data["attempted_questions"]:
        if invalid_question_result_data(ques_res_data):
            return create_response(
                message="Missing required question result information",
                status=422,
                data={"status": "fail"},
            )
        db_question_result = create_question_result(new_quiz_result, ques_res_data)
        db.session.add(db_question_result)

    new_badges = give_user_badges(user, new_quiz_result)
    user.attempted_quizzes.append(new_quiz_result)
    db.session.commit()

    if len(new_badges) == 0:
        return create_response(
            message="Successfully created quiz result",
            status=200,
            data={"status": "success"},
        )
    else:
        return create_response(
            message="Successfully created quiz result; new badges earned",
            status=200,
            data={"results": new_badges},
        )


def delete_quiz_by_id(user_data):
    if invalid_model_helper(user_data, ["quiz_id"]):
        return False

    quiz_to_delete = Quiz.query.get(user_data["quiz_id"])
    if quiz_to_delete is None:
        return False

    db.session.delete(quiz_to_delete)
    db.session.commit()
    return True


@quiz.route("/delete_quiz", methods=["POST"])
@admin_route
def delete_quiz(user_id):
    user_data = request.get_json()
    did_delete = delete_quiz_by_id(user_data)
    if not did_delete:
        return create_response(
            message="Quiz id missing or quiz not found",
            status=422,
            data={"status": "fail"},
        )

    return create_response(
        message="Successfully created quiz result; new badges earned",
        status=200,
        data={"status": "success"},
    )


@quiz.route("/edit_quiz", methods=["POST"])
def edit_quiz():
    pdb.set_trace()
    user_data = request.get_json()
    did_delete = delete_quiz_by_id(user_data)
    if not did_delete:
        return create_response(
            message="Quiz id missing or quiz not found",
            status=422,
            data={"status": "fail"},
        )

    res = create_quiz_helper(request.get_json())
    return create_response(
        message=res["message"], status=res["status"], data=res["data"]
    )
