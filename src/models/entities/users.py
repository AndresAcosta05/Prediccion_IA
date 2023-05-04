from flask_login import UserMixin

class User(UserMixin):

    def __init__(self, id, document, name, lastname, user, password, fullname):
        self.id = id
        self.document = document
        self.name = name
        self.lastname = lastname
        self.user = user
        self.password = password
        self.fullname = fullname
    