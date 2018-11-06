from api.core import Mixin
from .base import db
from flask import current_app
from sqlalchemy import *


class QuizResult(Mixin, db.Model):
    """Quiz Result Table."""

    __tablename__ = "quizResult"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    num_correct = db.Column(db.Integer)
    num_total = db.Column(db.Integer)
    date_taken = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer)
    questions = db.relationship("QuestionResult", backref="quizResult", lazy=True)

    def __init__(self, num_correct: int, num_total: int, date_taken: str, user_id: int):
        self.num_correct = num_correct
        self.num_total = num_total
        self.date_taken = date_taken
        self.user_id = user_id
        self.questions = []

    def __repr__(self):
        return f"<QuizResult> id:{self.id} num_correct:{self.num_correct} num_total:{self.num_total} date_taken:{self.date_taken} user_id:{self.user_id}"
