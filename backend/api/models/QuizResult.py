from api.core import Mixin
from .base import db
from flask import current_app
from sqlalchemy import *
from datetime import datetime


class QuizResult(Mixin, db.Model):
    """Quiz Result Table."""

    __tablename__ = "quizResult"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    num_correct = db.Column(db.Integer)
    num_total = db.Column(db.Integer)
    date_taken = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=True)
    quiz_id = db.Column(db.Integer)
    attempted_questions = db.relationship(
        "QuestionResult", backref="quizResult", lazy=True
    )

    def __init__(
        self,
        user_id: int,
        quiz_id: int,
        num_correct: int,
        num_total: int,
        date_taken: datetime,
    ):
        self.user_id = user_id
        self.quiz_id = quiz_id
        self.num_correct = num_correct
        self.num_total = num_total
        self.date_taken = date_taken
        self.attempted_questions = []

    def __repr__(self):
        return f"<QuizResult> id:{self.id} num_correct:{self.num_correct} num_total:{self.num_total} date_taken:{self.date_taken} user_id:{self.user_id} quiz_id:{self.quiz_id}"
