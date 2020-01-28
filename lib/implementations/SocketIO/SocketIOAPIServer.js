"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const core_decorators_1 = require("core-decorators");
const socket_io_1 = __importDefault(require("socket.io"));
const BaseAPIServer_1 = require("../../BaseAPIServer");
const common_1 = require("./common");
let SocketIOAPIServer = class SocketIOAPIServer extends BaseAPIServer_1.BaseAPIServer {
    constructor(socketioServer) {
        super();
        this.socketioServer = socketioServer;
        this.sockets = {};
        this.socketRemovers = {};
    }
    createRequestHandler(socket) {
        return (req) => __awaiter(this, void 0, void 0, function* () {
            const handler = this.handlers[req.apiName];
            const result = yield handler(req.request);
            socket.emit(common_1.EventTypes.RESPONSE, {
                apiName: req.apiName,
                response: result,
                requestId: req.requestId,
            });
        });
    }
    addSocket(socket) {
        const handler = this.createRequestHandler(socket);
        socket.on(common_1.EventTypes.REQUEST, handler);
        this.sockets[socket.id] = socket;
        this.socketRemovers[socket.id] = () => {
            socket.off(common_1.EventTypes.REQUEST, handler);
        };
    }
    // FIXME: socket.off --- ???
    removeSocket(socketId) {
        const socket = this.sockets[socketId];
        if (socket) {
            this.socketRemovers[socketId]();
        }
    }
    cleanUp() {
        // ...ww
        this.socketioServer.close();
    }
};
SocketIOAPIServer = __decorate([
    core_decorators_1.autobind,
    __metadata("design:paramtypes", [Object])
], SocketIOAPIServer);
exports.SocketIOAPIServer = SocketIOAPIServer;
