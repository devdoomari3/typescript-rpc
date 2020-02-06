"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerRuntimeError extends Error {
    constructor(actualError) {
        super(`RuntimeError: ${actualError.message}`);
        this.actualError = actualError;
        this.stack = actualError.stack;
    }
}
exports.ServerRuntimeError = ServerRuntimeError;
