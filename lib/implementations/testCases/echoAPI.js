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
const createAPI_1 = require("../../createAPI");
const ConnectionError_1 = require("../../errors/ConnectionError");
exports.echoAPI = createAPI_1.createAPIDefinition()('echo');
exports.echoAPITest = {
    description: '...should be OK with Echo API',
    run({ APIClient, APIServer, }) {
        return __awaiter(this, void 0, void 0, function* () {
            APIServer.addAPI(exports.echoAPI, (req) => __awaiter(this, void 0, void 0, function* () {
                return {
                    echoResp: req.echoReq,
                };
            }));
            const result = yield APIClient.callAPI(exports.echoAPI)({
                echoReq: 'test',
            });
            const expectedResult = {
                echoResp: 'test',
            };
            expect(result)
                .toStrictEqual(Either_1.right(expectedResult));
        });
    },
};
exports.echoAPINotConnectedTest = {
    description: '...should throw NOT CONNECTED error if not connected',
    run({ APIClient, APIServer, }) {
        return __awaiter(this, void 0, void 0, function* () {
            APIServer.addAPI(exports.echoAPI, (req) => __awaiter(this, void 0, void 0, function* () {
                return {
                    echoResp: req.echoReq,
                };
            }));
            const result = yield APIClient.callAPI(exports.echoAPI)({
                echoReq: 'test',
            });
            if (!Either_1.isLeft(result)) {
                throw new Error('result not Left< ... > (should be Left<ConnectionError>');
            }
            expect(result.left)
                .toBeInstanceOf(ConnectionError_1.ConnectionError);
        });
    },
};
