import socketio from 'socket.io';
import { BaseAPIServer } from '../../BaseAPIServer';
import { EventTypes, SocketIORequestType } from './common';

// const app = express();

// const server: Server = app.listen(1000);

// const socketioTest = socketio(server);

export class SocketIOAPIServer extends BaseAPIServer {
  sockets: {
    [socketId: string]: SocketIO.Socket;
  } = {};
  socketRemovers: {
    [socketId: string]: () => void;
  } = {};
  constructor(public socketioServer: socketio.Server) {
    super();
  }
  createRequestHandler(socket: SocketIO.Socket) {
    return async (req: SocketIORequestType) => {
      const handler = this.handlers[req.apiName];
      const result = await handler(req.request);
      socket.send(EventTypes.RESPONSE, result);
    };
  }
  addSocket(socket: SocketIO.Socket) {
    const handler = this.createRequestHandler(socket);
    socket.on(
      EventTypes.REQUEST,
      handler,
    );
    this.sockets[socket.id] = socket;
    this.socketRemovers[socket.id] = () => {
      socket.off(EventTypes.REQUEST, handler);
    };
  }
  // FIXME: socket.off --- ???
  removeSocket(socketId: string) {
    const socket = this.sockets[socketId];
    if (socket) {
      this.socketRemovers[socketId]();
    }
  }
  cleanUp() {
    // ...ww
    this.socketioServer.close();
  }
}
