from api.core import Mixin
from .base import db
from flask import current_app
from sqlalchemy import *


class Quiz(Mixin, db.Model):
    """Quiz Table."""

    __tablename__ = "quiz"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    quiz_name = db.Column(db.String, nullable=False)
    book_name = db.Column(db.String, nullable=False)
    questions = db.relationship("Question", backref="quiz", lazy=True)
    book_id = db.Column(db.Integer, db.ForeignKey("book.id"), nullable=True)

    def __init__(self, quiz_name, book_name):
        self.quiz_name = quiz_name
        self.book_name = book_name
        self.questions = []


    def __repr__(self):
        return f"<Quiz> quiz_name:{self.quiz_name} book_name:{self.book_name} questions:{self.questions}"
