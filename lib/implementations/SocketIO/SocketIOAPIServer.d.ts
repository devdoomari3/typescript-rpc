import socketio from 'socket.io';
import { BaseAPIServer } from '../../BaseAPIServer';
import { SocketIORequestType } from './common';
export declare class SocketIOAPIServer extends BaseAPIServer {
    socketioServer: socketio.Server;
    sockets: {
        [socketId: string]: SocketIO.Socket;
    };
    socketRemovers: {
        [socketId: string]: () => void;
    };
    constructor(socketioServer: socketio.Server);
    createRequestHandler(socket: SocketIO.Socket): (req: SocketIORequestType) => Promise<void>;
    addSocket(socket: SocketIO.Socket): void;
    removeSocket(socketId: string): void;
    cleanUp(): void;
}
