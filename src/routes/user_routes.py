from flask import Blueprint, jsonify, request
from controllers.users_controller import UserController
from models.entities.email import Email_template
from flask_login import login_required
from flask_cors import cross_origin

users = Blueprint('users', __name__)

# routes
@users.route('/getUser', methods=['POST', 'GET'])
def getUser():
    pass

@users.route('/send_request', methods=['POST'])
@cross_origin()
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

@users.route('/get_email_request')
@login_required
@cross_origin()
def get_email_request():
    response = UserController.get_email_requests()
    return response

@users.route('/update_email_request', methods=['POST'])
@cross_origin()
def update_email_request():
    if request.method == 'POST':
        id = request.form['id']
        email = request.form['email']
        answer = request.form['answer']
        response = UserController.update_email_request(id)
        if response:
            Email_template().send_Email(email, 'Respuesta a la solicitud', None, answer)
            return jsonify(True)
        else:
            return jsonify(False)
