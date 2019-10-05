import argparse

from config import file_dir, port


def get_args():
    ap = argparse.ArgumentParser('German exercise web app.')

    # Add args
    ap.add_argument('-d', '--debug',
                    action='store_true',
                    help="Enable debugging mode.")

    ap.add_argument('-p', '--port', type=int,
                    help="Port number to run this service on.",
                    default=port)

    ap.add_argument('-f', '--file_dir', type=str,
                    help="Temporary storage filepath for uploaded text files.",
                    default=file_dir)

    return ap.parse_args()

