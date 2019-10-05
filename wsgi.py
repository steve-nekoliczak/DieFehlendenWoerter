import os

import config
from args import get_args

activate_this = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                             'venv', 'bin', 'activate_this.py')

application = config.connex_app

if __name__ == "__main__":
    args = get_args()
    config.flask_app.config['UPLOAD_FOLDER'] = args.file_dir

    with open(activate_this) as file_:
        exec(file_.read(), dict(__file__=activate_this))

    application.run(debug=args.debug, port=args.port)

