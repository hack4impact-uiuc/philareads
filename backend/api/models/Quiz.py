from api.core import Mixin
from .base import db
from flask import current_app
from sqlalchemy import *


class Quiz(Mixin, db.Model):
    """Quiz Table."""

    __tablename__ = "quiz"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    name = db.Column(db.String, nullable=False)
    questions = db.relationship("Question", backref="quiz", lazy=True)
    book_id = db.Column(db.Integer, db.ForeignKey("book.id"), nullable=True)

    def __init__(self, name):
        self.name = name
        self.questions = []

    def __repr__(self):
        return f"<Quiz> name is {self.name} questions are {self.questions}"
