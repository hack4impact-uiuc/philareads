from flask import Flask, jsonify, request, Blueprint,json
import pdb
from api.models import Quiz, Question, db, Book
from api.core import create_response, serialize_list, logger

book = Blueprint("book", __name__)

@book.route("/book", methods=["POST"])
def create_book():
    user_data = request.get_json()

    if('name' not in user_data or 'author' not in user_data):
        return create_response(
            message="Missing name field and/or author field", status=400, data={"status": "failure"}
        )

    book =  Book(user_data["name"], user_data["author"])
    db.session.add(book)
    db.session.commit()

    print("CREATED WITH ID " + str(book.id))
    return create_response(
        message="Book added", status=200, data={"status": "success"}
    )


@book.route("/<book_id>/quizzes", methods=["GET"])
def get_quizzes(book_id):
    book = Book.query.filter_by(id=book_id).first()
    if(book is None):
        return create_response(
            message="Book not found", status=400, data={"status": "failure"}
        )

    quizList = []

    print("GETTING QUIZZES")

    for quiz in book.quizzes:
        quizList.append(quiz.to_dict())

    print(quizList)
    jsonStr = json.dumps(quizList)
    print(jsonStr)

    return create_response(
        message="Quizzes corresponding to book_id returned", status=200, data={jsonify(Quizzes=jsonStr)}
    )
