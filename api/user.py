from json import loads
import requests

from config import yml


routes = yml['api_routes']['user_auth']

def register(email, password):
    response = requests.post(url=routes['register_url'],
                             params={'email': email,
                                     'password': password})
    if response.status_code == 200:
        return True
    else:
        return False


def get_info(email):
    response = requests.get(url=routes['get_info_url'],
                            params={'email': email})
    if response.status_code == 200:
        content = loads(response.content)
        return content
    else:
        return {}

def login():
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

