import { isLeft, left, right } from 'fp-ts/lib/Either';
import {
  createAPIDefinition,
} from '../../createAPI';
import { TestDefinition } from '../../testUtils/testAdapter';
import {
  BaseRequestType, BaseResponseType,
  ToRequestType,
  ToResponseType,
} from '../../types';
import { ConnectionError } from '../../errors/ConnectionError';

export type EchoRequest = ToRequestType<{
  echoReq: string;
}>;

export type EchoResponse = ToResponseType<{
  echoResp: string;
}>;

export const echoAPI = createAPIDefinition<
  EchoRequest,
  EchoResponse,
  Error
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
