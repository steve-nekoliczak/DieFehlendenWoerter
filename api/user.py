import bcrypt
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


def login(username, password):
    password = bytes(password, 'utf-8')

    user_dict = get_info(username)
    if not user_dict:
        return None

    # mongo_id = str(user_dict['_id']['$oid'])
    db_password = bytes(user_dict['password'], 'utf-8')

    if bcrypt.checkpw(password, db_password):
        data = {}
        data['token'] = 'dummy-token'
        return data
    else:
        return None
