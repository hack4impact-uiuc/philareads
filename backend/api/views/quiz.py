from flask import Flask, jsonify, request, Blueprint
import datetime
import pdb
import jwt
from api.models import Quiz, Question, db, Book, User, QuestionResult, QuizResult
from api.core import create_response, serialize_list, logger

quiz = Blueprint("quiz", __name__)


def invalid_model_helper(user_data, props):
    for prop in props:
        if prop not in user_data:
            return True
    return False


def invalid_question_result_data(user_data):
    return invalid_model_helper(
        user_data, ["user_answer", "correct_answer", "correct", "question_num"]
    )


def invalid_quiz_result_data(user_data):
    return invalid_model_helper(
        user_data, ["quiz_id", "num_correct", "num_total", "date_taken", "attempted_questions"]
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


@quiz.route("/quiz", methods=["POST"])
def create_quiz():
    user_data = request.get_json()

    if invalid_quiz_data(user_data):
        return create_response(
            message="Missing required quiz information",
            status=422,
            data={"status": "fail"},
        )

    if duplicate_quiz(user_data):
        return create_response(
            data={"status": "fail"}, message="Quiz already exists.", status=409
        )

    linked_book = Book.query.get(user_data["book_id"])
    if linked_book is None:
        return create_response(
            message="Book not found", status=422, data={"status": "fail"}
        )

    new_quiz = Quiz(user_data["name"])
    new_quiz.book_id = linked_book.id
    linked_book.quizzes.append(new_quiz)

    # write into database so that new_quiz has a PK
    db.session.add(new_quiz)
    db.session.commit()

    for q in user_data["questions"]:
        db_ques = Question(q["text"], q["options"])
        db_ques.quiz_id = new_quiz.id
        new_quiz.questions.append(db_ques)
        db.session.add(db_ques)

    db.session.commit()

    return create_response(
        message="Succesfuly created new quiz", status=200, data={"status": "success"}
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
        print(f"user_id is {user_id}")
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

    python_date = datetime.datetime.strptime(user_data["date_taken"], '%Y-%m-%dT%H:%M:%S.%fZ')
    dup_quiz_result = QuizResult.filter_by(date_taken=python_date).filter_by(user_id=user_id).filter_by(quiz_id=user_data["quiz_id"]).first()
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
        python_date
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

    db.session.commit()
    return create_response(
        message="Successfully created quiz result",
        status=200,
        data={"status": "success"},
    )
