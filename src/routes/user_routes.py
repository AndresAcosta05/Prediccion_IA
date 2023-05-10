from flask import Blueprint, jsonify, request
from controllers.users_controller import UserController
from models.entities.email import Email_template

users = Blueprint('users', __name__)

# routes
@users.route('/getUser', methods=['POST', 'GET'])
def getUser():
    pass

@users.route('/send_request', methods=['POST'])
def send_email_request():
    document = request.form['document']
    names = request.form['names']
    surnames = request.form['surnames']
    phone = request.form['phone']
    email = request.form['email']
    affair = request.form['affair']
    
    if document and names and surnames and phone and email and affair:
        response = UserController.send_email_request(document, names, surnames, phone, email, affair)
        if response:
            Email_template().send_Email(email, 'Confirmacion del registro de contacto', str(names+' '+surnames), None)
        return jsonify(response if response else False)
    else:
        return jsonify(False)
