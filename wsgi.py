import config
from routes import pages, resources
from args import get_args

app = config.connex_app


if __name__ == "__main__":
    args = get_args()
    config.flask_app.config['UPLOAD_FOLDER'] = args.file_dir
    app.run(debug=args.debug, port=args.port)
