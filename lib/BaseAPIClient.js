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
const Either_1 = require("fp-ts/lib/Either");
const Timeout_1 = require("./errors/Timeout");
exports.DEFAULT_RPC_OPTIONS = {
    timeoutMs: 10000000,
};
class BaseAPIClient {
    callAPI(api, defaultRPCOptions) {
        return (args, rpcOptions) => __awaiter(this, void 0, void 0, function* () {
            const _rpcOptions = Object.assign(Object.assign(Object.assign({}, exports.DEFAULT_RPC_OPTIONS), defaultRPCOptions), rpcOptions);
            const resultPromise = this.__callAPI(api)(args);
            const result = yield Promise.race([
                resultPromise,
                _rpcOptions.timeoutMs && doTimeout(_rpcOptions.timeoutMs),
            ]);
            if (result === undefined) {
                return Either_1.left(new Timeout_1.TimeoutError());
            }
            return Either_1.right(result);
        });
    }
}
exports.BaseAPIClient = BaseAPIClient;
function doTimeout(timeoutMs) {
    return new Promise(resolve => {
        setTimeout(resolve, timeoutMs);
    });
}
