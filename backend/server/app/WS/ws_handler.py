from flask import Blueprint, make_response, request
from app.library_registration import socketio #need instance for this decorator, JWT on the other hand doesn't because JWT reads context
from flask_socketio import emit, send

ws_handler = Blueprint('ws_handler', __name__)

@socketio.on("newChatMessage")
def handle_event(message):
    print(message)
    emit('newChatMessage', {'message': message}, broadcast = True)

