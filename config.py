import os
import sys

import connexion
from flask import session
from flask_login import LoginManager

basedir = os.path.abspath(os.path.dirname(__file__))
connex_app = connexion.FlaskApp(__name__, specification_dir=basedir)

flask_app = connex_app.app
flask_app.secret_key = 'bogus'

drive_letter = os.path.splitdrive(sys.executable)[0]
if drive_letter:
    drive_letter += '\\'
else:
    drive_letter = r'/'
file_dir = os.path.join(drive_letter, 'data', 'temp')

login_manager = LoginManager()
login_manager.init_app(flask_app)

connex_app.add_api("rest_api.yml")

sess = session

