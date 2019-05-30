from json import loads
import requests

from api_settings.de_exercise import get_paragraph_url


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
    pass

