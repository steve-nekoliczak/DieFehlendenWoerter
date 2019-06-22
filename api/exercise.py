from json import loads
import requests

from api_settings.de_exercise import (
    get_paragraph_url, get_document_list_url, get_ex_type_list_url,
    put_document_url
)


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


def get_ex_type_list(document_title):
    response = requests.get(url=get_ex_type_list_url,
                            params={'document_title': document_title})
    if response.status_code == 200:
        content = loads(response.content)
        return content
    else:
        return "get_ex_type_list failed.", 404


def put_document(document_title, document_author, file_path):
    with open(file_path, "r") as f:
        data = f.read()
    response = requests.put(url=put_document_url,
                            params={'document_title': document_title,
                                    'document_author': document_author},
                            data=bytes(data, 'utf-8'))
    if response.status_code == 200:
        return True
    else:
        return False

