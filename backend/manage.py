from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from api import create_app
from api.models import db
from flask import send_from_directory
import os

app = create_app()

manager = Manager(app)
migrate = Migrate(app, db)

manager.add_command("db", MigrateCommand)


@manager.command
def runserver():
    app.run(debug=True, host="0.0.0.0", port=5000)


@manager.command
def runworker():
    app.run(debug=False)


@manager.command
def recreate_db():
    """
    Recreates a local database. You probably should not use this on
    production.
    """
    db.drop_all()
    db.create_all()
    db.session.commit()

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    print(app.static_folder)
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    manager.run()
