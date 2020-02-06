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
Object.defineProperty(exports, "__esModule", { value: true });
const core_decorators_1 = require("core-decorators");
const electron_1 = require("electron");
const BaseAPIServer_1 = require("../../BaseAPIServer");
const common_1 = require("./common");
let MainIPCServer = class MainIPCServer extends BaseAPIServer_1.BaseAPIServer {
    constructor() {
        super();
        electron_1.ipcMain.on(common_1.channelName, (event, ipcArgs) => __awaiter(this, void 0, void 0, function* () {
            const handler = this.handlers[ipcArgs.funcName];
            if (!handler) {
                event.reply({
                    error: `NO SERVER IMPLEMENTATION FOR ${ipcArgs.funcName}`,
                    success: false,
                });
                throw new Error('Undefined ');
            }
            try {
                const result = yield handler(ipcArgs.funcArgs);
                const resp = {
                    funcReturn: result,
                    success: true,
                };
                event.reply(resp);
            }
            catch (e) {
                event.reply({
                    error: e,
                    success: false,
                });
            }
        }));
    }
    cleanUp() {
        throw new Error('Method not implemented.');
    }
};
MainIPCServer = __decorate([
    core_decorators_1.autobind,
    __metadata("design:paramtypes", [])
], MainIPCServer);
exports.MainIPCServer = MainIPCServer;
