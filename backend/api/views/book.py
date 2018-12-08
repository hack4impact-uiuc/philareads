from flask import Flask, jsonify, request, Blueprint, json
from sqlalchemy import or_
from api.models import Quiz, Question, db, Book, User
from api.core import (
    create_response,
    serialize_list,
    logger,
    admin_route,
    authenticated_route,
    invalid_model_helper,
)
import io
import csv

book = Blueprint("book", __name__)
valid_grades = ["Middle", "Intermediate"]


def invalid_book_data(user_data):
    return invalid_model_helper(
        user_data, ["name", "author", "grade", "year", "published"]
    )


@book.route("/book_from_csv", methods=["POST"])
@admin_route
def create_book_from_csv(user_id):
    uploaded_csv = request.files["File"]
    if not uploaded_csv:
        return create_response(message="Missing CSV file", status=409)

    stream = io.StringIO(uploaded_csv.stream.read().decode("UTF8"), newline=None)
    parsed_data = csv.reader(stream)
    header = next(parsed_data)
    header = [col.replace(" ", "_") for col in next(parsed_data)]
    for row in parsed_data:
        row_dict = {
            key.lower(): value for key, value in zip(header, row)
        }  # resilient to future changes of column positions
        if invalid_book_data(row_dict):
            return create_response(message=f"Invalid book data {row}", status=409)

        book = Book(
            row_dict["name"],
            row_dict["author"],
            row_dict["grade"],
            row_dict["year"],
            # if cover url exists then return it, otherwise use empty string
            row_dict.get("cover_url", ""),
            row_dict["published"],
        )

        db.session.add(book)

    db.session.commit()
    return create_response(
        message="Successfully created a book from csv file", status=200
    )


@book.route("/book", methods=["POST"])
@admin_route
def create_book(user_id):
    user_data = request.get_json()

    # check all fields are entered
    if invalid_book_data(user_data):
        return create_response(
            message="Missing required book information",
            status=400,
            data={"status": "failure"},
        )

    if user_data["grade"] not in valid_grades:
        return create_response(
            message="Grade is not valid, must be Middle or Intermediate",
            status=400,
            data={"status": "failure"},
        )

    # check book if not already in database
    dup_book = (
        Book.query.filter_by(name=user_data["name"])
        .filter_by(author=user_data["author"])
        .filter_by(grade=user_data["grade"])
        .filter_by(year=user_data["year"])
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
        # if cover url exists then return it, otherwise use empty string
        user_data.get("cover_url", ""),
        user_data["published"],
    )
    db.session.add(book)
    db.session.commit()

    return create_response(message="Book added", status=200, data={"status": "success"})


@book.route("/<book_id>/quizzes", methods=["GET"])
def get_quizzes(book_id):
    book = Book.query.filter_by(id=book_id).first()

    # check to see if book is valid
    if book is None:
        return create_response(
            message="Book not found", status=400, data={"status": "failure"}
        )

    quizList = []
    # add all quizzes associated with book
    for quiz in book.quizzes:
        if not quiz.published:
            continue
        temp_quiz = {}
        questionList = []
        for question in quiz.questions:
            questionList.append(question.to_dict())

        temp_quiz["name"] = quiz.name
        temp_quiz["book_id"] = book_id
        temp_quiz["quizzes"] = questionList
        quizList.append(temp_quiz)

    return create_response(
        message="Quizzes corresponding to book_id returned",
        status=200,
        data={"quizzes": quizList},
    )


@book.route("/books", methods=["GET"])
def find_books():
    user_data = request.args
    filtered_books = Book.query.filter_by(published=True)
    props = ["id", "name", "author", "grade", "year", "cover_url", "reader_url"]

    for prop in props:
        if prop in user_data:
            kwarg = {f"{prop}": user_data[prop]}
            filtered_books = filtered_books.filter_by(**kwarg)

    if "search_string" in user_data:
        tokens = user_data["search_string"].split(" ")
        for search in tokens:
            case_ins_search = "%{0}%".format(
                search
            )  # https://stackoverflow.com/questions/4926757/sqlalchemy-query-where-a-column-contains-a-substring
            filtered_books = filtered_books.filter(
                or_(
                    Book.name.ilike(case_ins_search), Book.author.ilike(case_ins_search)
                )
            )

    books_json = [bk.serialize_to_json() for bk in filtered_books.all()]

    return create_response(
        message="Successfully queried books", status=200, data={"results": books_json}
    )


@book.route("/years", methods=["GET"])
def get_years():
    # pdb.set_trace()
    published_books_years = Book.query.filter_by(published=True).with_entities(
        Book.year
    )
    years = [year_tuple[0] for year_tuple in published_books_years.distinct()]
    years = sorted(years, reverse=True)
    return create_response(
        message="Successfully gathered years", status=200, data={"years": years}
    )


@book.route("/publish_books", methods=["POST"])
@admin_route
def publish_books(user_id):
    user_data = request.get_json()
    if invalid_model_helper(user_data, ["year", "published"]):
        return create_response(
            message="Missing year or published field",
            status=422,
            data={"status": "fail"},
        )

    books_to_change = Book.query.filter_by(year=user_data["year"])
    books_to_change.update(dict(published=user_data["published"]))
    db.session.commit()

    return create_response(
        message="Successfully changed published statuses",
        status=200,
        data={"status": "success"},
    )


@book.route("/delete_book", methods=["POST"])
@admin_route
def delete_quiz(user_id):
    user_data = request.get_json()
    if invalid_model_helper(user_data, ["book_id"]):
        return create_response(
            message="Missing book id", status=422, data={"status": "fail"}
        )

    book_to_delete = Book.query.get(user_data["book_id"])
    if book_to_delete is None:
        return create_response(
            message="Book not found", status=422, data={"status": "fail"}
        )

    db.session.delete(book_to_delete)
    db.session.commit()
    return create_response(
        message="Successfully deleted book", status=200, data={"status": "success"}
    )


@book.route("/edit_book", methods=["POST"])
@admin_route
def edit_book(user_id):
    user_data = request.get_json()
    if invalid_book_data(user_data):
        return create_response(
            message="Missing required book info", status=422, data={"status": "fail"}
        )

    book_to_edit = Book.query.get(user_data["book_id"])
    if book_to_edit is None:
        return create_response(
            message="Book not found", status=422, data={"status": "fail"}
        )

    book_to_edit.name = user_data["name"]
    book_to_edit.author = user_data["author"]
    book_to_edit.grade = user_data["grade"]
    book_to_edit.year = user_data["year"]
    book_to_edit.cover_url = user_data.get("cover_url", "")

    db.session.commit()
    return create_response(
        message="Successfully edited book", status=200, data={"status": "success"}
    )
