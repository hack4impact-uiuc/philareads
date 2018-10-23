from flask import Flask, jsonify, request, Blueprint
from api.models import Quiz, Question, db
from api.core import create_response, serialize_list, logger

quiz = Blueprint("quiz", __name__)


# function that is called when you visit /register
@quiz.route("/create_quiz", methods=["POST"])
def create_quiz():
    print("CALLED")
    user_data = request.get_json()
    new_quiz = Quiz(user_data["name"])

    #write into database so that new_quiz has a PK
    db.session.add(new_quiz)
    db.session.commit()

    for q in user_data["questions"]:
        print("creating the first question")
        db_ques = Question(q["text"], q["options"])
        db_ques.quiz_id = new_quiz.id
        new_quiz.questions.append(new_quiz)
        db.session.add(db_ques)
        db.session.commit()
        print("during creating quiz has questions")
        print(new_quiz.questions)

    print("after creation, quiz has questions:")
    print(new_quiz.questions)


@quiz.route("/debug_quiz", methods=["POST", "GET"])
def debug_quiz():
    print(Quiz.query.all())
