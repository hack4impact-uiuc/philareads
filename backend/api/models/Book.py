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
    quizzes = db.relationship("Quiz", backref="book", lazy=True)

    def __init__(self, name: str, author: str):
        self.name = name
        self.author = author
        self.quizzes = []

    def __repr__(self):
        return f"<Question>name is {self.name} author is {self.author} quizzes are {self.quizzes}"
