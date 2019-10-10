import os

import config
from routes import pages, resources
from args import get_args


if __name__ == "__main__":
    args = get_args()
    config.flask_app.config['UPLOAD_FOLDER'] = args.file_dir
    config.connex_app.run(debug=args.debug, port=args.port)

