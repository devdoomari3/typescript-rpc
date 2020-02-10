import getPort from 'get-port';
import http from 'http';
import socketIO from 'socket.io';
import socketIOClient from 'socket.io-client';
import { startHTTPServer, stopHTTPServer } from '../../testUtils/httpServer';
import { PackagedImplementationForTest as ClientServerPair } from '../../testUtils/testAdapter';
import { SocketIOAPIClient } from './SocketIOAPIClient';
import { SocketIOAPIServer } from './SocketIOAPIServer';

export function clientConnect({
  uri,
  dontCheckConnected,
}: {
  uri: string;
  dontCheckConnected?: boolean;
},
): Promise<SocketIOClient.Socket> {
  return new Promise((resolve, reject) => {
    const clientSocket = socketIOClient.connect(uri);
    if (dontCheckConnected) resolve(clientSocket);
    clientSocket.on('connect', () => resolve(clientSocket));
    clientSocket.on('error', reject);

  });
}
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
      const serverSocketIO = socketIO(httpServer);
      const APIServer = new SocketIOAPIServer(serverSocketIO);
      serverSocketIO.on(
        'connection',
        socket => APIServer.addSocket(socket),
      );
      const clientPort = args?.disconnected ? await getPort() : serverPort;

      const clientSocketIO = await clientConnect({
        uri: `http://127.0.0.1:${clientPort}`,
        dontCheckConnected: args?.disconnected,
      });
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
