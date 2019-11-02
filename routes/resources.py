import os

from flask import (
    send_from_directory
)

from config import flask_app


@flask_app.route("/favicon.ico")
def favicon():
    return send_from_directory(os.path.join(os.path.dirname(__file__),
                                            'static', 'images'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')
