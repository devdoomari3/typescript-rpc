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
Object.defineProperty(exports, "__esModule", { value: true });
const BaseAPIServer_1 = require("../../BaseAPIServer");
const common_1 = require("./common");
class ExpressAPIServer extends BaseAPIServer_1.BaseAPIServer {
    constructor(expressApp, options) {
        super();
        this.expressApp = expressApp;
        expressApp.post(`/${common_1.DEFAULT_PATH}`, 
        // options?.urlPath ?? DEFAULT_PATH,
        (req, resp) => __awaiter(this, void 0, void 0, function* () {
            const { funcName, args, } = req.body;
            const handler = this.apiRunners[funcName];
            try {
                const result = yield handler(args);
                resp
                    .status(200)
                    .send(result);
            }
            catch (e) {
                console.error(e);
                resp
                    .status(500)
                    .send('aaa');
            }
        }));
    }
    cleanUp() {
        throw new Error('Method not implemented.');
    }
}
exports.ExpressAPIServer = ExpressAPIServer;
