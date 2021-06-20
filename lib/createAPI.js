"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAPIDefinition = void 0;
function createAPIDefinition() {
    function __withAPIName(name) {
        return {
            name,
            type: 'ReqRespAPIType',
        };
    }
    return __withAPIName;
}
exports.createAPIDefinition = createAPIDefinition;
