from flask import Blueprint
from models.users_model import UserModel

users = Blueprint('users', __name__)

# routes
@users.route('/getUser', methods=['POST', 'GET'])
def getUser():
    pass
