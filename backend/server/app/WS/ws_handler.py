from flask_socketio import emit, send
from app.models import socketio

@socketio.on("newChatMessage")
def handle_event(message):
    emit('newChatMessage', {'data': "WORKED !!!"})
