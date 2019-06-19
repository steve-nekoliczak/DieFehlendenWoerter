
import bcrypt
from flask_login import UserMixin

from api.user import get_info, register
from config import login_manager, sess


@login_manager.user_loader
def load_user(email):
    return User(email=email).fetch_user()


class User(UserMixin):

    def __init__(self, email, password=''):
        self.email = email
        self.password = password

    def set_password(self, password):
        self.password = password

    def fetch_user(self):
        user_dict = get_info(self.email)
        if not user_dict:
            return None
        return self

    def set_session(self, is_successful):
        sess['username'] = self.email
        if is_successful:
            sess['is_authenticated'] = True
        else:
            sess['is_authenticated'] = False

    def register(self):
        hashed_password = bcrypt.hashpw(self.password, bcrypt.gensalt(5))

        got_registered = register(self.email, hashed_password)
        if got_registered:
            self.set_session(True)
            return True
        else:
            self.set_session(False)
            return False

    def authenticate(self):
        user_dict = get_info(self.email)
        if not user_dict:
            return False

        db_password = bytes(user_dict['password'], 'utf-8')
        got_authenticated = bcrypt.checkpw(self.password, db_password)

        if got_authenticated:
            self.set_session(True)
            return True
        else:
            self.set_session(False)
            return False

    def is_authenticated(self):
        if 'is_authenticated' in sess:
            return sess['is_authenticated']
        return False

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.email

