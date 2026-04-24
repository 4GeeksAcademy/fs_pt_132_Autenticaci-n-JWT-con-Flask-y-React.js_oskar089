"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from sqlalchemy import select




api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# 1. RUTA DE REGISTRO (Signup)
# el usuario crea su cuenta por primera vez
@api.route('/signup', methods=['POST'])
def handle_signup():
    body = request.get_json()

# Verificamos que nos hayan enviado los datos
    if body is None:
        return jsonify({"msg": "No enviaste datos en el cuerpo"}), 400
    if "username" not in body or "password" not in body:
        return jsonify({"msg": "Debes poner un correo y una contraseña"}), 400
    
    username = body.get("username")
    password =body.get("password")

    # Revisamos si el usuario ya existe en la base de datos
    user_exists = db.session.execute(select(User).where(User.username == username)).scalar_one_or_none()
    if user_exists:
        return jsonify({"msg": "El usuario ya existe"}), 400
    user = User(username = username, password = password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "Usuario creado con éxito", 
                    "user":user.serialize()}), 201

#Login

@api.route('/login', methods=['POST'])
def handle_login():
    body = request.get_json()
    username = body.get("username")
    password = body.get("password")

    # Filtrar usuario por nombre
    query = select(User).where(User.username == username)
    user = db.session.execute(query).scalar_one_or_none()

    if user is None or user.password != password:
        return jsonify({"msg": "Credenciales inválidas"}), 401

    # Creamos la pulsera (Token) usando el ID del usuario
    access_token = create_access_token(identity=str(user.id))
    return jsonify({"token": access_token, "user_id": user.id}), 200

# 3. PRIVADO: Validar el acceso
@api.route('/private', methods=['GET'])
@jwt_required()
def handle_private():
    # Extraemos el ID del dueño del token
    current_user_id = get_jwt_identity()
    
    #  Obtener por ID
    user = db.session.get(User, current_user_id)

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    return jsonify({
        "msg": f"Hola {user.username}, estás en el área privada",
        "user": user.serialize()
    }), 200
