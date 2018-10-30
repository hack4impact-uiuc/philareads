from flask import Flask, jsonify, request, Blueprint
import pdb
from api.models import Quiz, Question, db, Book
from api.core import create_response, serialize_list, logger

book = Blueprint("book", __name__)

@book.route("/create_book", methods=["POST"])
def create_book():
    user_data = request.get_json()

    if('name' not in user_data or 'author' not in user_data):
        return create_response(
            message="Missing fields", status=400, data={"status": "failure"}
        )

    book =  Book(user_data["name"], user_data["author"])
    db.session.add(book)
    db.session.commit()

    return create_response(
        message="Book added", status=200, data={"status": "success"}
    )


@book.route("/<book_name>/quizzes", methods=["GET"])
def get_quizzes(book_name):
    book = Book.query.filter_by(name=book_name).first()
    if(book is None):
        return create_response(
            message="Book not found", status=400, data={"status": "failure"}
        )

    print("GETTING QUIZZES")

    for quiz in book.quizzes:
        print(quiz)

    db.session.commit()

    return create_response(
        message="Success", status=200, data={"status": "success"}
    )
