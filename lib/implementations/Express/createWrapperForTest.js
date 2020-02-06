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
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const get_port_1 = __importDefault(require("get-port"));
const http_1 = __importDefault(require("http"));
const httpServer_1 = require("../../testUtils/httpServer");
const ExpressClient_1 = require("./ExpressClient");
const ExpressServer_1 = require("./ExpressServer");
exports.packagedExpressImplForTest = {
    name: 'ExpressJS_Implementation',
    createImplementationInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            const app = express_1.default();
            app.use(body_parser_1.default.json());
            const port = yield get_port_1.default();
            const httpServer = yield httpServer_1.startHTTPServer(http_1.default.createServer(app), port);
            const APIServer = new ExpressServer_1.ExpressAPIServer(app);
            const APIClient = new ExpressClient_1.HTTPAxiosClient(`http://127.0.0.1:${port}/`);
            return {
                APIServer,
                APIClient,
                cleanUp() {
                    return __awaiter(this, void 0, void 0, function* () {
                        yield httpServer_1.stopHTTPServer(httpServer);
                    });
                },
                name: 'ExpressJS_Impl',
            };
        });
    },
};
