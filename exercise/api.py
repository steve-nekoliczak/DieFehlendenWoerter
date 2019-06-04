from json import loads
import requests

from api_settings.de_exercise import get_paragraph_url, get_document_list_url
from api_settings.dfw_grader import post_ex_attempt_url


def get_paragraph(document_title, paragraph_index, ex_types=[]):
    response = requests.get(url=get_paragraph_url,
                            params={'document_title': document_title,
                                    'paragraph_index': paragraph_index,
                                    'ex_types': ex_types})
    if response.status_code == 200:
        content = loads(response.content)
        return content
    else:
        return "get_paragraph failed.", 404


def get_document_list():
    response = requests.get(url=get_document_list_url)
    if response.status_code == 200:
        content = loads(response.content)
        return content
    else:
        return "get_document_list failed.", 404


def post_ex_attempt(ex_id, topic_word_index, guess):
    response = requests.post(url=post_ex_attempt_url,
                             params={'ex_id': ex_id,
                                     'user_id': 'steve',  # TODO fix this once logins work
                                     'topic_word_index': topic_word_index,
                                     'guess': guess})
    if response.status_code == 200:
        content = loads(response.content)
        return content
    else:
        return "post_ex_attempt failed.", 404


