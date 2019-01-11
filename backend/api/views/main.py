from flask import Blueprint
from flask import request, send_from_directory, current_app

from api.core import create_response, serialize_list, logger
from api.models import Question, db
import os

main = Blueprint("main", __name__)

# serve the react frontend
@main.route("/", defaults={"path": ""})
@main.route("/<path:path>")
def serve_frontend(path):
    static_folder = current_app.static_folder
    print("using this new path now", static_folder)
    if path != "" and os.path.exists(static_folder + "/" + path):
        return send_from_directory(static_folder, path)
    else:
        return send_from_directory(static_folder, "index.html")


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
