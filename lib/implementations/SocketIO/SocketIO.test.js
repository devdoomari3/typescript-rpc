"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testAdapter_1 = require("../../testUtils/testAdapter");
const echoAPI_1 = require("../testCases/echoAPI");
const createClientServerPair_1 = require("./createClientServerPair");
testAdapter_1.runTestsForImplementation([echoAPI_1.echoAPITest], createClientServerPair_1.createClientServerPair({
    name: 'SocketIO Normal',
}));
testAdapter_1.runTestsForImplementation([echoAPI_1.echoAPINotConnectedTest], createClientServerPair_1.createClientServerPair({
    name: 'SocketIO disconnected API',
    disconnected: true,
}));
