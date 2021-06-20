import { autobind } from 'core-decorators';
import * as SocketIO from 'socket.io';
import { BaseAPIServer } from '../../BaseAPIServer';
import { EventTypes, SocketIORequestType, SocketIOResponseType } from './common';

@autobind
export class SocketIOAPIServer extends BaseAPIServer {
  sockets: {
    [socketId: string]: SocketIO.Socket;
  } = {};
  socketRemovers: {
    [socketId: string]: () => void;
  } = {};
  constructor(public socketioServer: SocketIO.Server) {
    super();
  }
  createRequestHandler(socket: SocketIO.Socket) {
    return async (req: SocketIORequestType) => {
      const handler = this.handlers[req.apiName];
      const result = await handler(req.request);
      socket.emit(EventTypes.RESPONSE, {
        apiName: req.apiName,
        response: result,
        requestId: req.requestId,
      } as SocketIOResponseType);
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
