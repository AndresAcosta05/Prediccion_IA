from flask import Blueprint, jsonify, request
from flask_login import login_required
from flask_cors import cross_origin
# librerias de la red neuronal
import tensorflow as tf
import numpy as np


machine_learning = Blueprint('Machine_Learning', __name__)

@machine_learning.route('/red_neuronal', methods=['POST'])
@cross_origin()
def red_neuronal():
    grados = int(request.form['grados'])
    celsius =np.array([-40, -10,0,8,15,22,38],dtype=np.float64)
    farenheit = np.array([-40,14,32,46,58,72,100],dtype=np.float64)

    oculta1=tf.keras.layers.Dense(units=3,input_shape=[1])
    oculta2=tf.keras.layers.Dense(units=3)
    salida=tf.keras.layers.Dense(units=1)
    modelo=tf.keras.Sequential([oculta1,oculta2,salida])

    modelo.compile(
    optimizer=tf.keras.optimizers.Adam(0.1),
    loss='mean_squared_error'
    )

    modelo.fit(celsius,farenheit,epochs=1000,verbose=False)
    resultado=modelo.predict([grados])
    return jsonify({
        'Grados': float(resultado[0][0])
    })

