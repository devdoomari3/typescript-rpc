import {
  Either,
  left,
  right,
} from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import {
  BaseRequestType,
  BaseResponseType,
  ReqRespAPIType,
  UnpackReqRespAPIType,
} from './types';

import { _ErrorDefinitionType, __KnownErrorType } from './errors/__base';
import { TimeoutErrorType } from './errors/common/Timeout';
import { doTimeout } from './utils/timeout';
import { defaultKnownErrors } from './errors';

export type RPCOptions = {
  timeoutMs?: number;
};

export type APICall<
  RequestType extends BaseRequestType,
  ResponseType extends BaseResponseType,
  name extends string,
  RuntimeErrorTypes extends t.Mixed,
  ClientErrorTypes extends t.Mixed & __KnownErrorType
    = typeof defaultKnownErrors.errorsUnion,
> = (
  request: Omit<RequestType, '___BaseRequestType'>,
  rpcOptions?: RPCOptions,
) => Promise<
  Either<
    RuntimeErrorTypes | ClientErrorTypes,
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
  KnownErrorTypes extends t.Mixed & __KnownErrorType
    = typeof defaultKnownErrors.errorsUnion,
> = APICall<
  UnpackReqRespAPIType<APIType>['RequestType'],
  UnpackReqRespAPIType<APIType>['ResponseType'],
  UnpackReqRespAPIType<APIType>['RuntimeErrorTypes'],
  KnownErrorTypes,
  UnpackReqRespAPIType<APIType>['name']
>;

export abstract class BaseAPIClient<
  KnownErrorTypes extends t.Mixed & __KnownErrorType
   = typeof defaultKnownErrors.errorsUnion
> {
  abstract __callAPI<
    APIType extends ReqRespAPIType<any, any, any, any>
  >(
    api: APIType,
    defaultRPCOptions?: RPCOptions,
  ): GetAPICallType<APIType, KnownErrorTypes>;

  callAPI<
    APIType extends ReqRespAPIType<any, any, any, any>
  > (
    api: APIType,
    defaultRPCOptions?: RPCOptions,
  ): GetAPICallType<APIType, KnownErrorTypes> {
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
          return left<TimeoutErrorType>({
            _$args: {},
            _$errorName: 'TimeoutError',
            _$type: '__KnownErrorType',
          });
        }

        return right(result);
      } catch (e) {
        return left(e);
      }
    };

  }
}


