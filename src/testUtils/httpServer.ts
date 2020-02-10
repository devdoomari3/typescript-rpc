
import http from 'http';

export function startHTTPServer(
  httpServer: http.Server,
  port: number,
  host: string = '127.0.0.1',
) {
  return new Promise<http.Server>((resolve, reject) => {
    const listeningServer = httpServer
      .listen(
        port, host,
      )
      .once('listening', () => {
        resolve(listeningServer);
      })
      .on('error', reject);
  });
}

export function stopHTTPServer(
  httpServer: http.Server,
) {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      httpServer.emit('close');
      err && reject();
      resolve();
    });
    setImmediate(() => httpServer.emit('close'));
  });
}
