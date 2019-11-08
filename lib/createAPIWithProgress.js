"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
