from api.core import Mixin
from .base import db
from flask import current_app
from sqlalchemy import *


class Quiz(Mixin, db.Model):
    """Quiz Table."""

    __tablename__ = "quiz"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    name = db.Column(db.String, nullable=False)
    questions = db.relationship(
        "Question", cascade="all,delete", backref="quiz", lazy=True
    )
    book_id = db.Column(db.Integer, db.ForeignKey("book.id"), nullable=True)
    quiz_results = db.relationship(
        "QuizResult", cascade="all,delete", backref="quiz", lazy=True
    )
    published = db.Column(db.Boolean, nullable=False)

    def __init__(self, name: str, pub: bool):
        self.name = name
        self.published = pub
        self.questions = []

    def __repr__(self):
        return f"<Quiz> id:{self.id} name:{self.name} questions:{self.questions} book_id:{self.book_id}"
