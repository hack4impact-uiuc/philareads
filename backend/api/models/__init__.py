# this file structure follows http://flask.pocoo.org/docs/1.0/patterns/appfactories/
# initializing db in api.models.base instead of in api.__init__.py
# to prevent circular dependencies
from .User import User
from .Question import Question
from .Book import Book
from .Quiz import Quiz
from .QuizResult import QuizResult
from .QuestionResult import QuestionResult
from .base import db
from .QuizResult import QuizResult
from .QuestionResult import QuestionResult
from .Badge import give_user_badges
from .ParentAdvice import ParentAdvice
