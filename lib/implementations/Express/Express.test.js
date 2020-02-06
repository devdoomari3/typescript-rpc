"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const testAdapter_1 = require("../../testUtils/testAdapter");
const echoAPI_1 = require("../testCases/echoAPI");
const createWrapperForTest_1 = require("./createWrapperForTest");
axios_1.default.defaults.adapter = require('axios/lib/adapters/http');
testAdapter_1.runTestsForImplementation([echoAPI_1.echoAPITest], createWrapperForTest_1.packagedExpressImplForTest);
