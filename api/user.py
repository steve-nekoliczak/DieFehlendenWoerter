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

