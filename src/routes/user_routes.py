from flask import Blueprint

users = Blueprint('users', __name__)

# routes
@users.route('/getUser', methods=['POST', 'GET'])
def getUser():
    return f'this a response'