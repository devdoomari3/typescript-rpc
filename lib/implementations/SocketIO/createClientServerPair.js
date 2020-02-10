"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_port_1 = __importDefault(require("get-port"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const httpServer_1 = require("../../testUtils/httpServer");
const SocketIOAPIClient_1 = require("./SocketIOAPIClient");
const SocketIOAPIServer_1 = require("./SocketIOAPIServer");
function clientConnect({ uri, dontCheckConnected, }) {
    return new Promise((resolve, reject) => {
        const clientSocket = socket_io_client_1.default.connect(uri);
        if (dontCheckConnected)
            resolve(clientSocket);
        clientSocket.on('connect', () => resolve(clientSocket));
        clientSocket.on('error', reject);
    });
}
exports.clientConnect = clientConnect;
function createClientServerPair(args) {
    var _a;
    return {
        name: ((_a = args) === null || _a === void 0 ? void 0 : _a.name) || 'SocketIO Implementation',
        createImplementationInstance() {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                const serverPort = yield get_port_1.default();
                const httpServer = yield httpServer_1.startHTTPServer(http_1.default.createServer(), serverPort, '127.0.0.1');
                const serverSocketIO = socket_io_1.default(httpServer);
                const APIServer = new SocketIOAPIServer_1.SocketIOAPIServer(serverSocketIO);
                serverSocketIO.on('connection', socket => APIServer.addSocket(socket));
                const clientPort = ((_a = args) === null || _a === void 0 ? void 0 : _a.disconnected) ? yield get_port_1.default() : serverPort;
                const clientSocketIO = yield clientConnect({
                    uri: `http://127.0.0.1:${clientPort}`,
                    dontCheckConnected: (_b = args) === null || _b === void 0 ? void 0 : _b.disconnected,
                });
                const APIClient = new SocketIOAPIClient_1.SocketIOAPIClient();
                APIClient.init(clientSocketIO);
                return {
                    APIClient,
                    APIServer,
                    cleanUp() {
                        return __awaiter(this, void 0, void 0, function* () {
                            yield httpServer_1.stopHTTPServer(httpServer);
                        });
                    },
                };
            });
        },
    };
}
exports.createClientServerPair = createClientServerPair;
