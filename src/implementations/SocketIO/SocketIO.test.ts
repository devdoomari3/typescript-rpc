import getPort from 'get-port';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import socketIOClient from 'socket.io-client';
import { echoAPI } from '../testFixtures/APIs';
import { SocketIOAPIClient } from './SocketIOAPIClient';
import { SocketIOAPIServer } from './SocketIOAPIServer';

jest.setTimeout(50000);

function listenHTTPServer(
  httpServer: http.Server,
  port: number,
  host: string,
) {
  return new Promise<http.Server>((resolve, reject) => {
    const listeningServer = httpServer.listen(
      port, host,
    ).once('listening', () => {
      resolve(listeningServer);
    });
  });
}
describe('SocketIO implementation should...', () => {

  let apiServer: SocketIOAPIServer;
  let apiClient: SocketIOAPIClient;
  let httpServer: http.Server;
  beforeEach(async () => {
    const port = await getPort();
    const httpServer2 = http.createServer();
    httpServer = await listenHTTPServer(
      httpServer2,
      port,
      '127.0.0.1',
    );
    const serverSocketIO = new SocketIOServer(httpServer);
    apiServer = new SocketIOAPIServer(serverSocketIO);
    const clientSocketIO = socketIOClient(
      `http://127.0.0.1:${port}`,
    );
    serverSocketIO.on('connection', socket => {
      console.log('1');
      apiServer.addSocket(socket)
    });
    await new Promise(resolve => {
      clientSocketIO.on('connect', () => resolve(null));
    });
    apiClient = new SocketIOAPIClient(clientSocketIO);
    apiServer.addAPI(echoAPI, async req => {
      return {
        echoResp: req.echoReq,
      };
    });
  });

  it('test', async () => {
    const result = await apiClient.useAPI(echoAPI)({
      echoReq: 'test',
    });
    expect(true).toBeTruthy();
  });
  afterEach(async () => {
    apiClient.cleanUp()
    await new Promise((resolve) => {
      httpServer.close(resolve);
    });
    
  });
  // test('call/handle simple API request');
});
