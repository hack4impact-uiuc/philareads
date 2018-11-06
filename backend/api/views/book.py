from flask import Flask, jsonify, request, Blueprint, json
import pdb
from api.models import Quiz, Question, db, Book
from api.core import create_response, serialize_list, logger

book = Blueprint("book", __name__)


@book.route("/book", methods=["POST"])
def create_book():
    print("CREATE BOOK")
    user_data = request.get_json()

    # check all fields are entered
    if "name" not in user_data or "author" not in user_data:
        return create_response(
            message="Missing name field and/or author field",
            status=400,
            data={"status": "failure"},
        )

    # check book if not already in database
    matching_books = Book.query.filter_by(name=user_data["name"]).all()
    for book in matching_books:
        print("BOOK")
        print(book)
        print("AUTHOR")
        print(book.author)
        if book.author == user_data["author"]:
            return create_response(
                message="Duplicate book", status=400, data={"status": "failure"}
            )

    print("MATCHING_QUIZ")
    print(matching_books)

    # add book to database
    book = Book(user_data["name"], user_data["author"])
    db.session.add(book)
    db.session.commit()

    return create_response(message="Book added", status=200, data={"status": "success"})


@book.route("/<book_id>/quizzes", methods=["GET"])
def get_quizzes(book_id):
    book = Book.query.filter_by(id=book_id).first()
    print("BOOK")
    print(book)

    # check to see if book is valid
    if book is None:
        return create_response(
            message="Book not found", status=400, data={"status": "failure"}
        )

    quizList = []
    questionList = []

    print("GETTING QUIZZES")

    # add all quizzes associated with book
    for quiz in book.quizzes:
        temp_quiz = {}
        for question in quiz.questions:
            questionList.append(question.to_dict())

        temp_quiz["name"] = book.name
        temp_quiz["book_id"] = book_id
        temp_quiz["quizzes"] = questionList
        quizList.append(temp_quiz)

    jsonStr = json.dumps(quizList)

    return create_response(
        message="Quizzes corresponding to book_id returned",
        status=200,
        data={"quizzes": jsonStr},
    )
