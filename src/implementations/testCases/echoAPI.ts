import { isLeft, right } from 'fp-ts/lib/Either';
import {
  createAPIDefinition,
} from '../../createAPI';
import { ConnectionError } from '../../errors/ConnectionError';
import {  } from '../../errors/ServerRuntimeError';
import { TestDefinition } from '../../testUtils/testAdapter';
import {
  ToRequestType,
  ToResponseType,
} from '../../types';

export type EchoRequest = ToRequestType<{
  echoReq: string;
}>;

export type EchoResponse = ToResponseType<{
  echoResp: string;
}>;

export const echoAPI = createAPIDefinition<
  EchoRequest,
  EchoResponse
>()('echo');

export const echoAPITest: TestDefinition = {
  description: '...should be OK with Echo API',
  async run({
    APIClient,
    APIServer,
  }) {
    APIServer.addAPI(echoAPI, async req => {
      return {
        echoResp: req.echoReq,
      };
    });
    const result = await APIClient.callAPI(echoAPI)({
      echoReq: 'test',
    });
    const expectedResult = {
      echoResp: 'test',
    } as EchoResponse;
    expect(result)
      .toStrictEqual(right(expectedResult));
  },
};

export const echoAPINotConnectedTest: TestDefinition = {
  description: '...should throw NOT CONNECTED error if not connected',
  async run({
    APIClient,
    APIServer,
  }) {
    APIServer.addAPI(echoAPI, async req => {
      return {
        echoResp: req.echoReq,
      };
    });
    const result = await APIClient.callAPI(echoAPI)({
      echoReq: 'test',
    });

    if (!isLeft(result)) { throw new Error('result not Left< ... > (should be Left<ConnectionError>'); }
    expect(result.left)
      .toBeInstanceOf(ConnectionError);
  },
};

export const echoAPIServerSideError: TestDefinition = {
  description: '...should throw Server Runtime Error on Server runtime error',
  async run({
    APIClient,
    APIServer,
  }) {
    APIServer.addAPI(echoAPI, async req => {
      throw new ReferenceError('Just Error');
    });
    const result = await APIClient.callAPI(echoAPI)({
      echoReq: 'test',
    });

    if (!isLeft(result)) { throw new Error('result not Left< ... > (should be Left<ConnectionError>'); }
    type t = typeof result.left;
    console.error(result.left);
    // expect(
    //   (result.left as ServerRuntimeError)
    //     .error
    //     .errorClass,
    // )
    //   .toEqual('ReferenceError');
  },
};

export const echoAPIWithoutServerAPIError: TestDefinition = {
  description: '...should throw Server Runtime Error on Server runtime error',
  async run({
    APIClient,
    APIServer,
  }) {
    APIServer.addAPI(echoAPI, async req => {
      throw new ReferenceError('Just Error');
    });
    const result = await APIClient.callAPI(echoAPI)({
      echoReq: 'test',
    });

    if (!isLeft(result)) { throw new Error('result not Left< ... > (should be Left<ConnectionError>'); }
    expect(result.left)
      .toBeInstanceOf(ConnectionError);
  },
};
