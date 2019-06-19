import argparse
import os

from flask import (
    render_template, send_from_directory, redirect, request, url_for
)
from flask_login import(
    login_required, login_user, logout_user
)

from config import connex_app, flask_app
from models import User


def get_args():
    ap = argparse.ArgumentParser('Process human language sentences into JSON.')

    # Add args
    ap.add_argument('-p', '--port', type=int,
                    help="Port number to run this service on.",
                    default=5012)

    a = ap.parse_args()

    return a


@flask_app.route("/login", methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = bytes(request.form['password'], 'utf-8')
        user = User(email, password)

        if 'register' in request.form:
            got_registered = user.register()

            if got_registered:
                login_user(user)
                return redirect(url_for('home'))
            else:
                return render_template("login.html")

        else:
            got_authenticated = user.authenticate()

            if got_authenticated:
                login_user(user)
                return redirect(url_for('home'))
            else:
                return render_template("login.html")

    else:
        return render_template("login.html")


@flask_app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))


@flask_app.route("/")
@flask_app.route("/home")
@login_required
def home():
    return render_template("home.html")


@flask_app.route("/stats")
@login_required
def stats():
    return render_template("stats.html")


@flask_app.route("/favicon.ico")
def favicon():
    return send_from_directory(os.path.join(os.path.dirname(__file__),
                                            'static', 'images'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')


if __name__ == "__main__":
    args = get_args()

    connex_app.run(debug=True, port=args.port)

