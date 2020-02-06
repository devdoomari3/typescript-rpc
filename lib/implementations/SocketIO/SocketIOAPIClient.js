"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const defer_promise_1 = __importDefault(require("defer-promise"));
const v4_1 = __importDefault(require("uuid/v4"));
const BaseAPIClient_1 = require("../../BaseAPIClient");
const common_1 = require("./common");
const ConnectionError_1 = require("../../errors/ConnectionError");
let SocketIOAPIClient = class SocketIOAPIClient extends BaseAPIClient_1.BaseAPIClient {
    constructor() {
        super(...arguments);
        this.responseHandlers = {};
    }
    init(socket) {
        this.socket = socket;
        socket.on(common_1.EventTypes.RESPONSE, (data) => {
            var _a;
            const requestHandler = this.responseHandlers[data.requestId];
            (_a = requestHandler) === null || _a === void 0 ? void 0 : _a.resolve(data.response);
        });
    }
    __callAPI(api) {
        return (req) => __awaiter(this, void 0, void 0, function* () {
            const requestId = v4_1.default();
            const futureResponse = defer_promise_1.default();
            this.responseHandlers[requestId] = futureResponse;
            const reqToSend = {
                apiName: api.name,
                request: req,
                requestId,
            };
            if (this.socket && this.socket.connected) {
                this.socket.emit(common_1.EventTypes.REQUEST, reqToSend);
            }
            else {
                futureResponse.reject(new ConnectionError_1.ConnectionError('SocketIOClient: ClientSocket not created or connected'));
            }
            return futureResponse.promise;
        });
    }
};
SocketIOAPIClient = __decorate([
    core_decorators_1.autobind
], SocketIOAPIClient);
exports.SocketIOAPIClient = SocketIOAPIClient;
