import os
import logging

from flask import Flask, request, send_from_directory, render_template
from flask_cors import CORS
from flask_migrate import Migrate
from sqlalchemy_utils import create_database, database_exists

from api.config import config
from api.core import all_exception_handler


class RequestFormatter(logging.Formatter):
    def format(self, record):
        record.url = request.url
        record.remote_addr = request.remote_addr
        return super().format(record)


def create_app(test_config=None):
    app = Flask(__name__, static_folder="react_frontend/build")

    CORS(app, supports_credentials=True)  # add CORS

    # check environment variables to see which config to load
    env = os.environ.get("FLASK_ENV", "dev")
    if test_config:
        # ignore environment variable config if config was given
        app.config.from_mapping(**test_config)
    else:
        app.config.from_object(config[env])

    # logging
    formatter = RequestFormatter(
        "%(asctime)s %(remote_addr)s: requested %(url)s: %(levelname)s in [%(module)s: %(lineno)d]: %(message)s"
    )
    if app.config.get("LOG_FILE"):
        fh = logging.FileHandler(app.config.get("LOG_FILE"))
        fh.setLevel(logging.DEBUG)
        fh.setFormatter(formatter)
        app.logger.addHandler(fh)

    strm = logging.StreamHandler()
    strm.setLevel(logging.DEBUG)
    strm.setFormatter(formatter)

    app.logger.addHandler(strm)
    app.logger.setLevel(logging.DEBUG)

    # decide whether to create database
    if env != "prod":
        db_url = app.config["SQLALCHEMY_DATABASE_URI"]
        if not database_exists(db_url):
            create_database(db_url)

    # register sqlalchemy to this app
    from api.models import db

    db.init_app(app)
    Migrate(app, db)

    # import and register blueprints
    from api.views import main
    from api.views import authenticate
    from api.views import quiz
    from api.views import book
    from api.views import user
    from api.views import parentadvice
    from api.views import year

    app.register_blueprint(main.main, url_prefix='/frontend')
    app.register_blueprint(authenticate.authenticate, url_prefix='/api')
    app.register_blueprint(quiz.quiz, url_prefix='/api')
    app.register_blueprint(book.book, url_prefix='/api')
    app.register_blueprint(user.user, url_prefix='/api')
    app.register_blueprint(parentadvice.parent_advice, url_prefix='/api')
    app.register_blueprint(year.year, url_prefix='/api')

    # register error Handler
    # app.register_error_handler(Exception, all_exception_handler)

    # # Serve React App
    # @app.route('/', defaults={'path': ''})
    # @app.route('/<path:path>')
    # def serve(path):
    #     return render_template("index.html")
    #     if path != "" and os.path.exists("react_app/build/" + path):
    #         return send_from_directory('react_app/build', path)
    #     else:
    #         return send_from_directory('react_app/build', 'index.html')

    return app
