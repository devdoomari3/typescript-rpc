import { BaseAPIClient } from '../BaseAPIClient';
import { BaseAPIServer } from '../BaseAPIServer';
export type ImplementationInstance = {
  APIClient: BaseAPIClient;
  APIServer: BaseAPIServer;
  cleanUp(): Promise<void>;
};

export type PackagedImplementationForTest = {
  name: string;
  createImplementationInstance(): Promise<ImplementationInstance>;
};

export type TestDefinition = {
  description: string;
  run (args: {
    APIClient: BaseAPIClient;
    APIServer: BaseAPIServer;
    implementationName: string;
  }): Promise<void>;
};

export function runTestsForImplementation(
  tests: TestDefinition[],
  wrappedImplementation: PackagedImplementationForTest,
) {
  describe(
    `${wrappedImplementation.name} implementation should...`,
    () => {
      let implInstance: ImplementationInstance | null;
      beforeEach(async () => {
        implInstance = await wrappedImplementation
          .createImplementationInstance();
      });
      tests.forEach(testDef => {
        it(`...should ${testDef.description}`, async () => {
          if (!implInstance) {
            throw new Error(
              `${wrappedImplementation.name} implementation not instantiated...`,
            );
          }
          await testDef.run({
            ...implInstance,
            implementationName: wrappedImplementation.name,
          });
        });
      });
      afterEach(async () => {
        await implInstance?.cleanUp();
      });
    },
  );
}
