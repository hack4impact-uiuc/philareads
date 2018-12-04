from api.core import Mixin
from .base import db
from flask import current_app
from sqlalchemy import *
from sqlalchemy.dialects.postgresql import ARRAY


class Book(Mixin, db.Model):
    """Book Table."""

    __tablename__ = "book"

    id = db.Column(db.Integer, unique=True, primary_key=True)

    name = db.Column(db.String, nullable=False)
    author = db.Column(db.String, nullable=False)
    grade = db.Column(db.Integer, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    cover_url = db.Column(db.String, nullable=True)
    quizzes = db.relationship("Quiz", backref="book", lazy=True)

    def __init__(self, name: str, author: str, grade: int, year: int, cover_url: str):
        self.name = name
        self.author = author
        self.grade = grade
        self.year = year
        self.cover_url = cover_url
        self.quizzes = []

    def __repr__(self):
        return f"<Book> id:{self.id} name:{self.name} author:{self.author} quizzes:{self.quizzes}"

    def serialize_to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "author": self.author,
            "grade": self.grade,
            "year": self.year,
            "cover_url": self.cover_url,
        }
