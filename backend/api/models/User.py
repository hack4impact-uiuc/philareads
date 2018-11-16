from api.core import Mixin
import datetime
from .base import db
import bcrypt
from flask import current_app
from sqlalchemy import *
from sqlalchemy.dialects.postgresql import ARRAY
import jwt


class User(Mixin, db.Model):
    """User Table."""

    __tablename__ = "user"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    name = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    attempted_quizzes = db.relationship("QuizResult", backref="user", lazy=True)
    badges = db.Column("options", ARRAY(Integer))

    def __init__(self, name: str, password: str, email: str):
        self.name = name
        self.password = bcrypt.hashpw(password.encode("utf8"), bcrypt.gensalt()).decode(
            "utf8"
        )
        self.email = email
        self.attempted_quizzes = []
        self.badges = []

    def __repr__(self):
        return f"<User name:{self.name}> password:{self.password} email:{self.email}"

    def encode_auth_token(self):
        """
        Generates the Auth Token
            :return: string
        """
        payload = {
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1, seconds=0),
            "iat": datetime.datetime.utcnow(),
            "sub": self.id,
        }
        return jwt.encode(
            payload, current_app.config.get("SECRET_KEY"), algorithm="HS256"
        )

    @staticmethod
    def decode_auth_token(auth_token):
        """
        Decodes the auth token
        :param auth_token:
        :return: integer|string
        """
        payload = jwt.decode(auth_token, current_app.config.get("SECRET_KEY"))
        return payload["sub"]
        # try:
        # payload = jwt.decode(auth_token, current_app.config.get("SECRET_KEY"))
        # return payload["sub"]
        # except jwt.ExpiredSignatureError:
        # return "Signature expired. Please log in again."
        # except jwt.InvalidTokenError:
        # return "Invalid token. Please log in again."
