import os

from flask import (
    flash, render_template, send_from_directory, redirect, request, url_for
)
from flask_login import(
    login_required, login_user, logout_user
)
from werkzeug.utils import secure_filename

from args import get_args
from config import connex_app, flask_app, file_dir, login_manager
from api.exercise import put_document
from models.user import User


@login_manager.unauthorized_handler
def unauthorized():
    return redirect(url_for('login'))


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


@flask_app.route("/upload_ex", methods=['POST', 'GET'])
@login_required
def upload_ex():

    if request.method == 'POST':
        if 'file' not in request.files:
            flash('No file attached')
            return redirect(request.url)

        title = request.form['title']
        author = request.form['author']
        file_ = request.files['file']

        if file_.filename == '':
            flash('No file selected')
            return redirect(request.url)

        filename = secure_filename(file_.filename)
        filepath = os.path.join(flask_app.config['UPLOAD_FOLDER'], filename)
        file_.save(filepath)

        got_put_document = put_document(title, author, filepath)
        if got_put_document:
            flash('File uploaded successfully.')
        else:
            flash('File failed to upload.')

        return redirect(request.url)

    else:
        return render_template("upload_ex.html")


@flask_app.route("/how_to")
@login_required
def how_to():
    return render_template("how_to.html")


@flask_app.route("/favicon.ico")
def favicon():
    return send_from_directory(os.path.join(os.path.dirname(__file__),
                                            'static', 'images'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == "__main__":
    args = get_args()

    flask_app.config['UPLOAD_FOLDER'] = args.file_dir

    connex_app.run(debug=args.debug, port=args.port)
