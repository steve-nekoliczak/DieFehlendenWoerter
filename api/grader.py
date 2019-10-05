from json import loads
import requests

from config import yml


routes = yml['api_routes']['dfw_grader']

def post_ex_attempt(ex_id, topic_word_index, guess):
    from config import sess
    response = requests.post(url=routes['post_ex_attempt_url'],
                             params={'ex_id': ex_id,
                                     'user_id': sess['username'],
                                     'topic_word_index': topic_word_index,
                                     'guess': guess})
    if response.status_code == 200:
        content = loads(response.content)
        return content
    else:
        return "post_ex_attempt failed.", 404

