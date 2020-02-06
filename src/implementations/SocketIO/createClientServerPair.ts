import getPort from 'get-port';
import http from 'http';
import socketIO from 'socket.io';
import socketIOClient from 'socket.io-client';
import { startHTTPServer, stopHTTPServer } from '../../testUtils/httpServer';
import { PackagedImplementationForTest as ClientServerPair } from '../../testUtils/testAdapter';
import { SocketIOAPIClient } from './SocketIOAPIClient';
import { SocketIOAPIServer } from './SocketIOAPIServer';

export function createClientServerPair(args?: {
  name?: string;
  disconnected?: boolean;
}): ClientServerPair {
  return {
    name: args?.name || 'SocketIO Implementation',
    async createImplementationInstance() {
      const serverPort = await getPort();
      const httpServer = await startHTTPServer(
        http.createServer(),
        serverPort,
        '127.0.0.1',
      );
      const clientPort = args?.disconnected ? await getPort() : serverPort;
      const serverSocketIO = socketIO(httpServer);
      const APIServer = new SocketIOAPIServer(serverSocketIO);
      const clientSocketIO = socketIOClient.connect(
        `http://127.0.0.1:${clientPort}`,
      );
      serverSocketIO.on(
        'connection',
        socket => APIServer.addSocket(socket),
      );
      const APIClient = new SocketIOAPIClient();
      APIClient.init(clientSocketIO);

      return {
        APIClient,
        APIServer,
        async cleanUp() {
          await stopHTTPServer(httpServer);
        },
      };
    },
  };

}
export const packagedSocketIOImplForTest: ClientServerPair = {
  name: 'SocketIO Implementation',
  async createImplementationInstance() {
    const port = await getPort();
    const httpServer = await startHTTPServer(
      http.createServer(),
      port,
      '127.0.0.1',
    );
    const serverSocketIO = socketIO(httpServer);
    const APIServer = new SocketIOAPIServer(serverSocketIO);
    const clientSocketIO = socketIOClient.connect(
      `http://127.0.0.1:${port}`,
    );
    serverSocketIO.on(
      'connection',
      socket => APIServer.addSocket(socket),
    );
    const APIClient = new SocketIOAPIClient();
    APIClient.init(clientSocketIO);

    return {
      APIClient,
      APIServer,
      async cleanUp() {
        await stopHTTPServer(httpServer);
      },
    };
  },
};
