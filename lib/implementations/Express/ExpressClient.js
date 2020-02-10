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
const axios_1 = __importDefault(require("axios"));
const url_1 = __importDefault(require("url"));
const v4_1 = __importDefault(require("uuid/v4"));
const BaseAPIClient_1 = require("../../BaseAPIClient");
const common_1 = require("./common");
class HTTPAxiosClient extends BaseAPIClient_1.BaseAPIClient {
    constructor(baseUrl, path = common_1.DEFAULT_PATH) {
        super();
        this.baseUrl = baseUrl;
        this.path = path;
        this.fullUrl = url_1.default.resolve(baseUrl, path);
    }
    __callAPI(api, defaultRPCOptions) {
        return (req) => __awaiter(this, void 0, void 0, function* () {
            const requestId = v4_1.default();
            const body = {
                funcName: api.name,
                args: req,
                requestId,
            };
            const result = yield axios_1.default.post(this.fullUrl, body);
            return result.data;
        });
    }
}
exports.HTTPAxiosClient = HTTPAxiosClient;
