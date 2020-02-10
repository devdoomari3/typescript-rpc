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
import { BaseError } from './errors/BaseError';
import { ServerRuntimeError } from './errors/ServerRuntimeError';
import { TimeoutError } from './errors/Timeout';

export type RPCOptions = {
  timeoutMs?: number;
};

export type APICall<
  RequestType extends BaseRequestType,
  ResponseType extends BaseResponseType,
  PossibleRuntimeErrorTypes extends Error,
  PossibleAPIClientError extends Error,
  name extends string,
> = (
  request: Omit<RequestType, '___BaseRequestType'>,
  rpcOptions?: RPCOptions,
) => Promise<
  Either<
    ServerRuntimeError<PossibleRuntimeErrorTypes> | PossibleAPIClientError,
    ResponseType
  >
>;

export const DEFAULT_RPC_OPTIONS: RPCOptions = {
  timeoutMs: 10000000,
};

// export type ErrorFromAPICall<
//   APIClient extends BaseAPIClient<any>,

// > = APIClient extends BaseAPIClient<infer ClientErrorTypes> ? {

// } & ClientErrorTypes : never;

export type GetAPICallType<
  APIType extends ReqRespAPIType<any, any, any, any>,
  ClientErrorTypes extends BaseError = BaseError
> = APICall<
  UnpackReqRespAPIType<APIType>['RequestType'],
  UnpackReqRespAPIType<APIType>['ResponseType'],
  UnpackReqRespAPIType<APIType>['PossibleRuntimeErrorTypes'],
  ClientErrorTypes,
  UnpackReqRespAPIType<APIType>['name']
>;

export abstract class BaseAPIClient<
  ClientErrorTypes extends BaseError = BaseError
> {
  abstract __callAPI<
    APIType extends ReqRespAPIType<any, any, any, any>
  >(
    api: APIType,
    defaultRPCOptions?: RPCOptions,
  ): GetAPICallType<APIType, ClientErrorTypes>;

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
      try {
        const resultPromise = this.__callAPI(api)(args);
        const result = await Promise.race([
          resultPromise,
          _rpcOptions.timeoutMs && doTimeout(_rpcOptions.timeoutMs),
        ]);
        if (result === undefined) {
          return left(new TimeoutError());
        }

        return right(result);
      } catch (e) {
        return left(e);
      }
    };

  }
}

function doTimeout(timeoutMs: number) {
  return new Promise<void>(resolve => {
    setTimeout(resolve, timeoutMs);
  });
}
