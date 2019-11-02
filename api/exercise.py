from json import loads
import requests

from config import yml


routes = yml['api_routes']['de_exercise']

def get_paragraph(document_title, paragraph_index, ex_types=[]):
    response = requests.get(url=routes['get_paragraph_url'],
                            params={'document_title': document_title,
                                    'paragraph_index': paragraph_index,
                                    'ex_types': ex_types})
    if response.status_code == 200:
        content = loads(response.content)
        return content
    else:
        return "get_paragraph failed.", 404


def get_document_list():
    response = requests.get(url=routes['get_document_list_url'])
    if response.status_code == 200:
        content = loads(response.content)
        return content
    else:
        return "get_document_list failed.", 404


def get_ex_type_list(document_title):
    response = requests.get(url=routes['get_ex_type_list_url'],
                            params={'document_title': document_title})
    if response.status_code == 200:
        content = loads(response.content)
        return content
    else:
        return "get_ex_type_list failed.", 404


def put_document(document_title, document_author, file_path):
    with open(file_path, "r") as f:
        data = f.read()
    response = requests.put(url=routes['put_document_url'],
                            params={'document_title': document_title,
                                    'document_author': document_author},
                            data=bytes(data, 'utf-8'))
    if response.status_code == 200:
        return True
    else:
        return False

def upload_ex():

    if request.method == 'POST':
        if 'file' not in request.files:
            flash('No file attached')
            return redirect(request.url)

        title = request.form['title']
        author = request.form['author']
        file_ = request.files['file']

        if file_.filename == '':
            flash('No file selected')
            return redirect(request.url)

        filename = secure_filename(file_.filename)
        filepath = os.path.join(flask_app.config['UPLOAD_FOLDER'], filename)
        file_.save(filepath)

        got_put_document = put_document(title, author, filepath)
        if got_put_document:
            flash('File uploaded successfully.')
        else:
            flash('File failed to upload.')

        return redirect(request.url)

    else:
        return render_template("upload_ex.html")

