from flask import Flask, jsonify, request, Blueprint, json
from sqlalchemy import or_
import pdb
from api.models import Quiz, Question, db, Book
from api.core import create_response, serialize_list, logger

book = Blueprint("book", __name__)


def invalid_book_data(user_data):
    if (
        (not "name" in user_data)
        or (not "author" in user_data)
        or (not "grade" in user_data)
        or (not "year" in user_data)
        or (not "cover_url" in user_data)
        or (not "reader_url" in user_data)
    ):
        return True


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
    dup_book = (
        Book.query.filter_by(name=user_data["name"])
        .filter_by(author=user_data["author"])
        .first()
    )

    if not (dup_book is None):
        return create_response(
            message="Duplicate book", status=409, data={"status": "failure"}
        )

    # add book to database
    book = Book(
        user_data["name"],
        user_data["author"],
        user_data["grade"],
        user_data["year"],
        user_data["cover_url"],
        user_data["reader_url"],
    )
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

    print("GETTING QUIZZES")

    # add all quizzes associated with book
    for quiz in book.quizzes:
        print(quiz)
        quizList.append(quiz.to_dict())

    print("QUIZ LIST")
    print(quizList)

    jsonStr = json.dumps(quizList)

    print("JSON STR")
    print(jsonStr)

    return create_response(
        message="Quizzes corresponding to book_id returned",
        status=200,
        data={jsonify(Quizzes=jsonStr)},
    )


@book.route("/books", methods=["GET"])
def find_books():
    user_data = request.args
    filtered_books = Book.query
    props = ["id", "name", "author", "grade", "year", "cover_url", "reader_url"]

    for prop in props:
        if prop in user_data:
            kwarg = {f"{prop}": user_data[prop]}
            filtered_books = filtered_books.filter_by(**kwarg)

    if "search_string" in user_data:
        tokens = user_data["search_string"].split(" ")
        for search in tokens:
            filtered_books = filtered_books.filter(
                or_(Book.name.contains(search), Book.author.contains(search))
            )

    books_json = [bk.serialize_to_json() for bk in filtered_books.all()]

    return create_response(
            message="Hello", status=200, data={"results": books_json}
    )
