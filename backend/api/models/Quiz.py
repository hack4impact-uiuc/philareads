from api.core import Mixin
import datetime
from .base import db
import bcrypt
from flask import current_app
import jwt
from sqlalchemy import *
from sqlalchemy.dialects.postgresql import ARRAY


class Quiz(Mixin, db.Model):
    """Quiz Table."""

    __tablename__ = "quiz"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    name = db.Column(db.String, nullable=False)
    questions = db.relationship('Quiz', backref='quiz', lazy=True)

    def __init__(self, name: str):
        self.name = name

    def __repr__(self):
        return f"<Quiz> name is {self.name}"

