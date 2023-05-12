# librarys
from flask import Flask, request, render_template, url_for, redirect, jsonify
from flask_login import LoginManager, login_required, logout_user, login_user
from flask_cors import CORS, cross_origin
# import configs and local resources
# from config import config
from routes.user_routes import users
from controllers.users_controller import UserController

app = Flask(__name__)
# configuring the app
app.secret_key = '9FSSbRHjf1JbMA7mO0rcCZ4PPTMbJoGm'
app.register_blueprint(users)

# loading login manager
login_manager_app = LoginManager(app)

#appling cors
cors = CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5000"}})

# routes for viewsss    
@login_manager_app.user_loader
def load_user(id):
    return UserController.get_user_by_id(id)

@app.route('/')
@cross_origin()
def index():
    return redirect(url_for('home'))

@app.route('/home')
@cross_origin()
def home():
    return render_template('index.html')

@app.route('/Nosotros')
@cross_origin()
def Nosotros():
    return render_template('Nosotros.html')

@app.route('/Prediccion')
@login_required
@cross_origin()
def Prediccion():
    return render_template('Prediccion.html')

@app.route('/Reporte')
@login_required
@cross_origin()
def Reporte():
    return render_template('Reporte.html')


@app.route('/Gestion')
@login_required
@cross_origin()
def Gestion():
    return render_template('Gestion.html')


@app.route('/Redneuronal')
@login_required
@cross_origin()
def Redneuronal():
    return render_template('Redneuronal.html')

@app.route('/Contactenos')
@cross_origin()
def Contactenos():
    return render_template('Contactenos.html')

@app.route('/login', methods=['POST', 'GET'])
@cross_origin()
def login():
    # check if try login
    if request.method == 'POST':
        user = request.form['user']
        password = request.form['password']
        # check that the user exist
        response = UserController.check_user(user)
        # check password
        if response:
            r = response if response.password == password else 'Contraseña incorrecta'
            if r != 'Contraseña incorrecta':
                login_user(r)
                # success
                return jsonify(str(2))
                
            else:
                # wrong password
                return jsonify(str(1))
        else:
            # no exist
            return jsonify(str(0))
    
@app.route('/logout')
@login_required
@cross_origin()
def logout():
    logout_user()
    return render_template('index.html')

def page_not_authorized(error):
    return "page not authorized"

def page_not_found(error):
    return "page not found"

if __name__ == '__main__':
    # app.config.from_object(config['development'])
    # register the errors for the page
    app.register_error_handler(401, page_not_authorized)
    app.register_error_handler(404, page_not_found)
    app.run(debug=True)