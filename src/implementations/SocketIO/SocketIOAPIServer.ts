import { autobind } from 'core-decorators';
import socketio from 'socket.io';
import { BaseAPIServer } from '../../BaseAPIServer';
import { toIServerRuntimeError } from '../../errors/ServerRuntimeError';
import {
  EventTypes,
  SocketIOErrorResponseType,
  SocketIORequestType,
  SocketIOResponseType,
} from './common';

@autobind
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
      try {
        const apiRunner = this.apiRunners[req.apiName];
        const result = await apiRunner(req.request);
        socket.emit(EventTypes.RESPONSE, {
          apiName: req.apiName,
          response: result,
          requestId: req.requestId,
        } as SocketIOResponseType);
      } catch (e) {
        // const runtimeError = new ServerRuntimeError(e);
        socket.emit(EventTypes.RUNNER_ERROR, {
          apiName: req.apiName,
          errorResponse: toIServerRuntimeError(e),
          requestId: req.requestId,
        } as SocketIOErrorResponseType);
      }

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
