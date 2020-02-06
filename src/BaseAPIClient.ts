import {
  Either,
  left,
  right,
} from 'fp-ts/lib/Either';

import {
  BaseRequestType,
  BaseResponseType,
  ReqRespAPIType,
  UnpackReqRespAPIType,
} from './types';

import {
  PossibleErrorTypes,
} from './errors';
import { TimeoutError } from './errors/Timeout';

export type RPCOptions = {
  timeoutMs?: number;
};

export type APICall<
  RequestType extends BaseRequestType,
  ResponseType extends BaseResponseType,
  PossibleRuntimeErrorTypes extends Error,
  name extends string,
> = (
  request: Omit<RequestType, '___BaseRequestType'>,
  rpcOptions?: RPCOptions,
) => Promise<
  Either<
    PossibleErrorTypes<PossibleRuntimeErrorTypes>,
    ResponseType
  >
>;

export const DEFAULT_RPC_OPTIONS: RPCOptions = {
  timeoutMs: 10000000,
};

export abstract class BaseAPIClient {
  abstract __callAPI<
    APIType extends ReqRespAPIType<any, any, any, any>
  >(
    api: APIType,
    defaultRPCOptions?: RPCOptions,
  ): APICall<
    UnpackReqRespAPIType<APIType>['RequestType'],
    UnpackReqRespAPIType<APIType>['ResponseType'],
    UnpackReqRespAPIType<APIType>['PossibleRuntimeErrorTypes'],
    UnpackReqRespAPIType<APIType>['name']
  >;

  callAPI<
    APIType extends ReqRespAPIType<any, any, any, any>
  > (
    api: APIType,
    defaultRPCOptions?: RPCOptions,
  ) {
    return async (
      args: Omit<
        UnpackReqRespAPIType<APIType>['RequestType'],
        '___BaseRequestType'
      >,
      rpcOptions?: RPCOptions,
    ) => {
      const _rpcOptions: RPCOptions = {
        ...DEFAULT_RPC_OPTIONS,
        ...defaultRPCOptions,
        ...rpcOptions,
      };
      const resultPromise = this.__callAPI(api)(args);
      const result = await Promise.race([
        resultPromise,
        _rpcOptions.timeoutMs && doTimeout(_rpcOptions.timeoutMs),
      ]);
      if (result === undefined) {
        return left(new TimeoutError());
      }

      return right(result);
    };

  }
}

function doTimeout(timeoutMs: number) {
  return new Promise<void>(resolve => {
    setTimeout(resolve, timeoutMs);
  });
}
