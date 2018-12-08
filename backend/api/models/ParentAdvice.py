from api.core import Mixin
from .base import db
from flask import current_app
from sqlalchemy import *


class ParentAdvice(Mixin, db.Model):
    """Parent Advice Table."""

    __tablename__ = "parent_advice"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    text = db.Column(db.String, nullable=False)

    def __init__(self, text: str):
        self.text = text

    def __repr__(self):
        return f"<ParentAdvice> id:{self.id} text:{self.text}"
