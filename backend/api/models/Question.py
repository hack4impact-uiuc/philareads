from api.core import Mixin
import datetime
from .base import db
import bcrypt
from flask import current_app
import jwt
from sqlalchemy import *
from sqlalchemy.dialects.postgresql import ARRAY


class Question(Mixin, db.Model):
    """Question Table."""

    __tablename__ = "question"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    text = db.Column(db.String, nullable=False)
    options = db.Column('options', ARRAY(String))
    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz.id'),
                    nullable=False)

    def __init__(self, text: str, options: ARRAY):
        self.text = text
        self.options = options

    def __repr__(self):
        return f"<Question> text is {self.text} options is {self.options}"

