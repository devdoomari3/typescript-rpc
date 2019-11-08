"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseAPIServer {
    constructor() {
        this.handlers = {};
    }
    addAPI(api, handler) {
        this.handlers[api.name] = handler;
    }
    checkAPIAllImplemented(apis) {
        Object.keys(apis).forEach(key => {
            const api = apis[key];
            if (api.type === 'ReqRespAPIType' &&
                !this.handlers[api.name])
                throw new Error(`HANDLER NOT IMPLEMENTED FOR: ${api.name}`);
        });
    }
}
exports.BaseAPIServer = BaseAPIServer;
