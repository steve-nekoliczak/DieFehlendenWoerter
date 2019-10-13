from json import loads
import requests

from config import yml
from flask import session


routes = yml['api_routes']['dfw_data_visualizer']


def get_stats(ex_type, from_datetime=None, to_datetime=None):
    response = requests.get(url=routes['get_stats_url'],
                            params={'user_id': session['mongo_user_id'],
                                    'ex_type': ex_type,
                                    'from_datetime': from_datetime,
                                    'to_datetime': to_datetime})
    if response.status_code == 200:
        content = loads(response.content)
        return content
    else:
        return "get_stats failed.", 404
