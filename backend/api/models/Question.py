from api.core import Mixin
from .base import db
from flask import current_app
from sqlalchemy import *
from sqlalchemy.dialects.postgresql import ARRAY


class Question(Mixin, db.Model):
    """Question Table."""

    __tablename__ = "question"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    text = db.Column(db.String, nullable=False)
    options = db.Column("options", ARRAY(String))
    correct_option = db.Column("correct_option", String)
    quiz_id = db.Column(db.Integer, db.ForeignKey("quiz.id"), nullable=False)

    def __init__(self, text: str, options: ARRAY, correct_option: str):
        self.text = text
        self.options = options
        self.correct_option = correct_option

    def __repr__(self):
        return f"<Question> text is {self.text} options is {self.options} correct_option is {self.correct_option}"
