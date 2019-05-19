from api.core import Mixin
import datetime
from .base import db
import bcrypt
from flask import current_app
from sqlalchemy import *
from sqlalchemy.dialects.postgresql import ARRAY
import jwt
from sqlalchemy.ext.mutable import Mutable


class MutableList(Mutable, list):
    def append(self, value):
        list.append(self, value)
        self.changed()

    @classmethod
    def coerce(cls, key, value):
        if not isinstance(value, MutableList):
            if isinstance(value, list):
                return MutableList(value)
            return Mutable.coerce(key, value)
        else:
            return value


class User(Mixin, db.Model):
    """User Table."""

    __tablename__ = "user"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    name = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False, unique=True)
    attempted_quizzes = db.relationship(
        "QuizResult", cascade="all,delete", backref="user", lazy=True
    )
    badges = db.Column("options", MutableList.as_mutable(ARRAY(Integer)))
    is_admin = db.Column(db.Boolean, nullable=False)

    def __init__(self, name: str, password: str, username: str):
        self.name = name
        self.password = bcrypt.hashpw(password.encode("utf8"), bcrypt.gensalt()).decode(
            "utf8"
        )
        self.username = username
        self.attempted_quizzes = []
        self.badges = []
        self.is_admin = False

    def __repr__(self):
        return (
            f"<User name:{self.name}> password:{self.password} username:{self.username}"
        )

    def serialize_to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "username": self.username,
            "badge_ids": self.badges,
            "is_admin": self.is_admin,
        }

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
        payload = jwt.decode(
            auth_token,
            current_app.config.get("SECRET_KEY"),
            algorithms="HS256"
        )
        return payload["sub"]
        # try:
        # payload = jwt.decode(auth_token, current_app.config.get("SECRET_KEY"))
        # return payload["sub"]
        # except jwt.ExpiredSignatureError:
        # return "Signature expired. Please log in again."
        # except jwt.InvalidTokenError:
        # return "Invalid token. Please log in again."
