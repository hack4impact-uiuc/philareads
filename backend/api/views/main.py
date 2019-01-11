from flask import Blueprint
from flask import request, send_from_directory, render_template

# from api.core import create_response, serialize_list, logger
from api.models import Question, db
import os

main = Blueprint("main", __name__)


# function that is called when you visit /
@main.route("/test")
def index():
    # access the logger with the logger from api.core and uses the standard logging module
    # logger.info("Hello World!")
    return "<h1>Hello World!</h1>"


# serve the react frontend
@main.route("/", defaults={"path": ""})
@main.route("/<path:path>")
def serve(path):
    print("user entered this: ", path)
    return send_from_directory("../../react_frontend/build", "index.html")
    # if path != "" and os.path.exists("react_frontend/build/" + path):
    #     return send_from_directory('react_frontend/build', path)
    # else:
    #     return send_from_directory('react_frontend/build', 'index.html')


# @main.route("/create_debug_question", methods=["POST"])
# def create_empty_question():
#     user_data = request.get_json()
#     ques1 = Question(text=user_data["text"], options=user_data["options"])
#     db.session.add(ques1)
#     db.session.commit()
#     return create_response(
#         data={"status": "success"}, message="created question", status=200
#     )
#
# @main.route("/read_debug_question", methods=["POST"])
# def read_first_question():
#     user_data = request.get_json()
#     ques1 = Question.query.filter_by(text=user_data["text"]).first()
#     print("PRINTING QUES1")
#     print(ques1)
#     print("option 0 is")
#     print(ques1.options[0])
#     return create_response(
#         data={"status": "success"}, message="created question", status=200
#     )
#
#
# @main.route("/create_debug_quiz"
# def create_empty_quiz():
#     user_data = request.get_json()
#     quiz1 = Quiz()
