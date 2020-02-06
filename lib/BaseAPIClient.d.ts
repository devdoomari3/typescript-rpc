import { Either } from 'fp-ts/lib/Either';
import { BaseRequestType, BaseResponseType, ReqRespAPIType, UnpackReqRespAPIType } from './types';
import { PossibleErrorTypes } from './errors';
import { TimeoutError } from './errors/Timeout';
export declare type RPCOptions = {
    timeoutMs?: number;
};
export declare type APICall<RequestType extends BaseRequestType, ResponseType extends BaseResponseType, PossibleRuntimeErrorTypes extends Error, name extends string> = (request: Omit<RequestType, '___BaseRequestType'>, rpcOptions?: RPCOptions) => Promise<Either<PossibleErrorTypes<PossibleRuntimeErrorTypes>, ResponseType>>;
export declare const DEFAULT_RPC_OPTIONS: RPCOptions;
export declare abstract class BaseAPIClient {
    abstract __callAPI<APIType extends ReqRespAPIType<any, any, any, any>>(api: APIType, defaultRPCOptions?: RPCOptions): APICall<UnpackReqRespAPIType<APIType>['RequestType'], UnpackReqRespAPIType<APIType>['ResponseType'], UnpackReqRespAPIType<APIType>['PossibleRuntimeErrorTypes'], UnpackReqRespAPIType<APIType>['name']>;
    callAPI<APIType extends ReqRespAPIType<any, any, any, any>>(api: APIType, defaultRPCOptions?: RPCOptions): (args: Pick<UnpackReqRespAPIType<APIType>["RequestType"], Exclude<keyof UnpackReqRespAPIType<APIType>["RequestType"], "___BaseRequestType">>, rpcOptions?: RPCOptions | undefined) => Promise<import("fp-ts/lib/Either").Left<TimeoutError> | import("fp-ts/lib/Either").Right<0 | import("fp-ts/lib/Either").Left<PossibleErrorTypes<UnpackReqRespAPIType<APIType>["PossibleRuntimeErrorTypes"]>> | import("fp-ts/lib/Either").Right<UnpackReqRespAPIType<APIType>["ResponseType"]>>>;
}
