import argparse
import os

from flask import render_template, send_from_directory, session

from config import connex_app, flask_app, sess


def get_args():
    ap = argparse.ArgumentParser('Process human language sentences into JSON.')

    # Add args
    ap.add_argument('-p', '--port', type=int,
                    help="Port number to run this service on.",
                    default=5012)

    a = ap.parse_args()

    return a


@flask_app.route("/home")
def home():
    return render_template("home.html")


@flask_app.route("/stats")
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

