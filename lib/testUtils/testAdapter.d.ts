import { BaseAPIClient } from '../BaseAPIClient';
import { BaseAPIServer } from '../BaseAPIServer';
export declare type ImplementationInstance = {
    APIClient: BaseAPIClient;
    APIServer: BaseAPIServer;
    cleanUp(): Promise<void>;
};
export declare type PackagedImplementationForTest = {
    name: string;
    createImplementationInstance(): Promise<ImplementationInstance>;
};
export declare type TestDefinition = {
    description: string;
    run(args: {
        APIClient: BaseAPIClient;
        APIServer: BaseAPIServer;
        implementationName: string;
    }): Promise<void>;
};
export declare function runTestsForImplementation(tests: TestDefinition[], wrappedImplementation: PackagedImplementationForTest): void;
