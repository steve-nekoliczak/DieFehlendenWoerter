import os
from server import connex_app as application

activate_this = '/home/steve/projects/DieFehlendeWoerter/DieFehlendenWoerter/venv/bin/activate_this.py'

if __name__ == "__main__":
    with open(activate_this) as file_:
        exec(file_.read(), dict(__file__=activate_this))

    application.run(debug=True, port=5012)
