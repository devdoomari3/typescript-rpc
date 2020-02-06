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
function runTestsForImplementation(tests, wrappedImplementation) {
    describe(`${wrappedImplementation.name} implementation should...`, () => {
        let implInstance;
        beforeEach(() => __awaiter(this, void 0, void 0, function* () {
            implInstance = yield wrappedImplementation
                .createImplementationInstance();
        }));
        tests.forEach(testDef => {
            it(`...should ${testDef.description}`, () => __awaiter(this, void 0, void 0, function* () {
                if (!implInstance) {
                    throw new Error(`${wrappedImplementation.name} implementation not instantiated...`);
                }
                yield testDef.run(Object.assign(Object.assign({}, implInstance), { implementationName: wrappedImplementation.name }));
            }));
        });
        afterEach(() => __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield ((_a = implInstance) === null || _a === void 0 ? void 0 : _a.cleanUp());
        }));
    });
}
exports.runTestsForImplementation = runTestsForImplementation;
