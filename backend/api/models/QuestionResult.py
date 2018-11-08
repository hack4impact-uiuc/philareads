from api.core import Mixin
from .base import db
from flask import current_app
from sqlalchemy import *


class QuestionResult(Mixin, db.Model):
    """Question Result Table."""

    __tablename__ = "questionResult"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    user_answer = db.Column(db.String, nullable=False)
    correct_answer = db.Column(db.String, nullable=False)
    correct = db.Column(db.Boolean, nullable=False)
    question_num = db.Column(db.Integer)
    quiz_result_id = db.Column(
        db.Integer, db.ForeignKey("quizResult.id"), nullable=True
    )

    def __init__(
        self, user_answer: str, correct_answer: str, correct: bool, question_num: int
    ):
        self.user_answer = user_answer
        self.correct_answer = correct_answer
        self.question_num = question_num
        self.correct = correct

    def __repr__(self):
        return f"<QuestionResult> id:{self.id} user_answer:{self.user_answer} correct_answer:{self.correct_answer} correct:{self.correct} question_num:{self.question_num}"
