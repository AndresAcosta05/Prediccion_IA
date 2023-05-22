from flask import Blueprint, jsonify, request
from flask_login import login_required
from flask_cors import cross_origin
# librerias de la red neuronal
import tensorflow as tf
import numpy as np
import pandas as pd
from sklearn import linear_model
from sklearn.model_selection import train_test_split


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

@machine_learning.route('/prediccion', methods=['POST'])
@cross_origin()
def prediccion():
    if request.method == 'POST':
        file = request.files['file']
        readed = pd.read_excel(file)
        readed[['Y1','Y2']].value_counts()

        independientes = readed[['X1','X2','X3','X4','X5','X6','X7','X8']]
        dependientes = readed[['Y1','Y2']]

        X_train, X_test, y_train, y_test = train_test_split(independientes, dependientes, test_size=0.3)
        regresion = linear_model.LinearRegression()
        regresion = regresion.fit(X_train,y_train)
        pred_escore = regresion.score(X_train,y_train)
        y_pred=regresion.predict(X_test)

        x1  = list(X_test['X1'])
        x2  = list(X_test['X2'])
        x3  = list(X_test['X3'])
        x4  = list(X_test['X4'])
        x5  = list(X_test['X5'])
        x6  = list(X_test['X6'])
        x7  = list(X_test['X7'])
        x8  = list(X_test['X8'])

        predicts = []
        count = 0
        for pred in y_pred:
            predicts.append({
                'X1': x1[count],
                'X2': x2[count],
                'X3': x3[count],
                'X4': x4[count],
                'X5': x5[count],
                'X6': x6[count],
                'X7': x7[count],
                'X8': x8[count],
                'Calefaccion': float(pred[0]),
                'Refrigeracion': float(pred[1]),
                'Puntaje': float(pred_escore)
            })
            count += 1
        return jsonify(predicts)