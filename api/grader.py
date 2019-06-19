from json import loads
import requests

from api_settings.dfw_grader import post_ex_attempt_url


def post_ex_attempt(ex_id, topic_word_index, guess):
    from config import sess
    response = requests.post(url=post_ex_attempt_url,
                             params={'ex_id': ex_id,
                                     'user_id': sess['username'],
                                     'topic_word_index': topic_word_index,
                                     'guess': guess})
    if response.status_code == 200:
        content = loads(response.content)
        return content
    else:
        return "post_ex_attempt failed.", 404

