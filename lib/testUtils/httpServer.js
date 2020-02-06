"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function startHTTPServer(httpServer, port, host = '127.0.0.1') {
    return new Promise((resolve, reject) => {
        const listeningServer = httpServer
            .listen(port, host)
            .once('listening', () => {
            resolve(listeningServer);
        });
    });
}
exports.startHTTPServer = startHTTPServer;
function stopHTTPServer(httpServer) {
    return new Promise((resolve, reject) => {
        httpServer.close((err) => {
            httpServer.emit('close');
            err && reject();
            resolve();
        });
        setImmediate(() => httpServer.emit('close'));
    });
}
exports.stopHTTPServer = stopHTTPServer;
