from json import loads
import requests

from api_settings.dfw_data_visualizer import get_stats_url


def get_stats(ex_type, from_datetime=None, to_datetime=None):
    from config import sess
    response = requests.get(url=get_stats_url,
                            params={'user_id': sess['username'],
                                    'ex_type': ex_type,
                                    'from_datetime': from_datetime,
                                    'to_datetime': to_datetime})
    if response.status_code == 200:
        content = loads(response.content)
        return content
    else:
        return "get_stats failed.", 404

