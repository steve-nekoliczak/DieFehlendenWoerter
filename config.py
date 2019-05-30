import os

import connexion
from flask import Flask


basedir = os.path.abspath(os.path.dirname(__file__))
connex_app = connexion.FlaskApp(__name__, specification_dir=basedir)

flask_app = connex_app.app

connex_app.add_api("rest_api.yml")
