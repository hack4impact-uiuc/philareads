from api.core import Mixin
from .base import db
from flask import current_app
from sqlalchemy import *


class Year(Mixin, db.Model):
    """Year Table."""

    __tablename__ = "year"

    id = db.Column(db.Integer, unique=True, primary_key=True)

    year = db.Column(db.Integer, nullable=False)

    def __init__(self, year: int):
        self.year = year

    def __repr__(self):
        return f"<Year> id:{self.id} year:{self.year}"
