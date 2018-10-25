from flask import Flask, jsonify, request, Blueprint
import pdb
from api.models import Quiz, Question, db
from api.core import create_response, serialize_list, logger

quiz = Blueprint("quiz", __name__)


def invalid_quiz_data(user_data):
    return (not "name" in user_data) or (not "questions" in user_data)


@quiz.route("/create_quiz", methods=["POST"])
def create_quiz():
    user_data = request.get_json()

    if invalid_quiz_data(user_data):
        return create_response(
            message="Failed to create new quiz", status=422, data={"status": "fail"}
        )

    new_quiz = Quiz(user_data["name"])

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


# @quiz.route("/debug_quiz", methods=["POST", "GET"])
# def debug_quiz():
# print("ALL QUIZZES ARE")
# print(Quiz.query.all())
