from json import loads
import requests

from api_settings.user_auth import register_url, get_info_url


def register(email, password):
    response = requests.post(url=register_url,
                             params={'email': email,
                                     'password': password})
    if response.status_code == 200:
        return True
    else:
        return False


def get_info(email):
    response = requests.get(url=get_info_url,
                            params={'email': email})
    if response.status_code == 200:
        content = loads(response.content)
        return content
    else:
        return {}

