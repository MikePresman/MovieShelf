from flask_socketio import SocketIO
socketio = SocketIO()

from flask_migrate import Migrate
migrate = Migrate()

from flask_jwt_extended import JWTManager
jwt=JWTManager()