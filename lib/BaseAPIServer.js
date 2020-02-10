"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseAPIServer {
    constructor() {
        this.apiRunners = {};
    }
    addAPI(api, apiRunner) {
        this.apiRunners[api.name] = apiRunner;
    }
    checkAPIAllImplemented(apis) {
        Object.keys(apis)
            .forEach(key => {
            const api = apis[key];
            if (api.APIType === 'ReqRespAPIType' &&
                !this.apiRunners[api.name])
                throw new Error(`HANDLER NOT IMPLEMENTED FOR: ${api.name}`);
        });
    }
}
exports.BaseAPIServer = BaseAPIServer;
