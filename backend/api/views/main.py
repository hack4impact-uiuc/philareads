from flask import Blueprint
from api.core import create_response, serialize_list, logger

main = Blueprint("main", __name__)


# function that is called when you visit /
@main.route("/")
def index():
    # access the logger with the logger from api.core and uses the standard logging module
    logger.info("Hello World!")
    return "<h1>Hello World!</h1>"
