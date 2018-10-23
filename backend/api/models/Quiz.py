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
    book_id = db.Column(db.Integer, db.ForeignKey("quiz.id"), nullable=False)

    def __init__(self):
        pass

    def __repr__(self):
        return f"<Quiz> name is {self.name}"
