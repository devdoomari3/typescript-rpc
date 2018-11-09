import socketio from 'socket.io';
import { BaseAPIServer } from '../../src/BaseAPIServer';


// const app = express();

// const server: Server = app.listen(1000);

// const socketioTest = socketio(server);

export class SocketIOAPIServer extends BaseAPIServer {
  constructor(public socketioServer: socketio.Server) {
    super();
    socketioServer.on('connection', socket => {
      socket.on();
    });
  }
  cleanUp() {
    // ...
    this.socketioServer.close();
  }
}
