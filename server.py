import argparse

from flask import render_template, url_for

from config import connex_app, flask_app


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


if __name__ == "__main__":
    args = get_args()

    connex_app.run(debug=True, port=args.port)










