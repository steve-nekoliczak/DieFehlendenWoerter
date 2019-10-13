import bcrypt
from flask_login import UserMixin
from flask import session

from api.user import get_info, register


class User(UserMixin):

    def __init__(self, email, password=''):
        self.email = email
        self.password = password
        self.mongo_id = ''
        self.db_password = ''

    def set_password(self, password):
        self.password = password

    def fetch_user(self):
        user_dict = get_info(self.email)
        if not user_dict:
            return None
        self.mongo_id = str(user_dict['_id']['$oid'])
        self.db_password = bytes(user_dict['password'], 'utf-8')
        return self

    def set_session(self, is_successful):
        session['username'] = self.email
        session['mongo_user_id'] = self.mongo_id
        session['is_authenticated'] = is_successful

    def register(self):
        hashed_password = bcrypt.hashpw(self.password, bcrypt.gensalt(5))
        got_registered = register(self.email, hashed_password)
        if got_registered:
            if not self.fetch_user():
                return False
            self.set_session(True)
        else:
            self.set_session(False)
        return session['is_authenticated']

    def authenticate(self):
        if not self.fetch_user():
            return False
        got_authenticated = bcrypt.checkpw(self.password, self.db_password)
        if got_authenticated:
            self.set_session(True)
        else:
            self.set_session(False)
        return session['is_authenticated']

    def is_authenticated(self):
        if 'is_authenticated' in session:
            return session['is_authenticated']
        return False

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.email
