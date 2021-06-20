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
const socket_io_1 = require("socket.io");
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const APIs_1 = require("../testFixtures/APIs");
const SocketIOAPIClient_1 = require("./SocketIOAPIClient");
const SocketIOAPIServer_1 = require("./SocketIOAPIServer");
jest.setTimeout(50000);
function listenHTTPServer(httpServer, port, host) {
    return new Promise((resolve, reject) => {
        const listeningServer = httpServer.listen(port, host).once('listening', () => {
            resolve(listeningServer);
        });
    });
}
describe('SocketIO implementation should...', () => {
    let apiServer;
    let apiClient;
    let httpServer;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const port = yield get_port_1.default();
        const httpServer2 = http_1.default.createServer();
        httpServer = yield listenHTTPServer(httpServer2, port, '127.0.0.1');
        const serverSocketIO = new socket_io_1.Server(httpServer);
        apiServer = new SocketIOAPIServer_1.SocketIOAPIServer(serverSocketIO);
        const clientSocketIO = socket_io_client_1.default(`http://127.0.0.1:${port}`);
        serverSocketIO.on('connection', socket => {
            console.log('1');
            apiServer.addSocket(socket);
        });
        yield new Promise(resolve => {
            clientSocketIO.on('connect', () => resolve(null));
        });
        apiClient = new SocketIOAPIClient_1.SocketIOAPIClient(clientSocketIO);
        apiServer.addAPI(APIs_1.echoAPI, (req) => __awaiter(void 0, void 0, void 0, function* () {
            return {
                echoResp: req.echoReq,
            };
        }));
    }));
    it('test', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield apiClient.useAPI(APIs_1.echoAPI)({
            echoReq: 'test',
        });
        expect(true).toBeTruthy();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        apiClient.cleanUp();
        yield new Promise((resolve) => {
            httpServer.close(resolve);
        });
    }));
    // test('call/handle simple API request');
});
