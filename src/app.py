# librarys
from flask import Flask, request, render_template, url_for, redirect
# import configs and local resources
from config import config
from routes.user_routes import users
from controllers.users_controller import UserController

app = Flask(__name__)
app.register_blueprint(users)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/Nosotros')
def Nosotros():
    return render_template('Nosotros.html')

@app.route('/login', methods=['POST', 'GET'])
def login():
    # check if want the login
    if request.method == 'GET':
        return render_template('auth/login.html')
    
    # check if try login
    elif request.method == 'POST':
        print(request.form['user']) 
        print(request.form['password'])
        return render_template('auth/login.html')

def page_not_authorized(error):
    return "page not authorized"

def page_not_found(error):
    return "page not found"

if __name__ == '__main__':
    app.config.from_object(config['development'])
    # register the errors for the page
    app.register_error_handler(401, page_not_authorized)
    app.register_error_handler(404, page_not_found)
    app.run()