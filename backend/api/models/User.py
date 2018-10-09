from api.core import Mixin
import datetime
from .base import db
import bcrypt
# from flask_bcrypt import Bcrypt
import jwt

class User(Mixin, db.Model):
    """User Table."""

    __tablename__ = "user"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    name = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    # email = db.relationship("Email", backref="emails")

    def __init__(self, name: str, password: str):
        self.name = name
        salt = bcrypt.gensalt()
        self.password = bcrypt.hashpw(password.encode(), salt)

    def __repr__(self):
        return f"<User {self.name}>"

    def encode_auth_token(self):
        """
        Generates the Auth Token
            :return: string
        """
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1, seconds=0),
                'iat': datetime.datetime.utcnow(),
                'sub': self.id,
                'test': 'working'
            }
            return jwt.encode(
                payload,
                "SECRET_KEY", #app.config.get('SECRET_KEY'),
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        """
        Decodes the auth token
        :param auth_token:
        :return: integer|string
        """
        try:
            payload = jwt.decode(auth_token, "SECRET_KEY") #app.config.get('SECRET_KEY')
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'
