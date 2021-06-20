"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAPIWithProgressDefinition = void 0;
function createAPIWithProgressDefinition() {
    function __withAPIName(name) {
        return {
            name,
            __requestTypeHolder: null,
            __responseTypeHolder: null,
            __withProgressAPIType: true,
        };
    }
    return __withAPIName;
}
exports.createAPIWithProgressDefinition = createAPIWithProgressDefinition;
