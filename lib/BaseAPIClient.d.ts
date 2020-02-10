import { Either } from 'fp-ts/lib/Either';
import { BaseRequestType, BaseResponseType, ReqRespAPIType, UnpackReqRespAPIType } from './types';
import { BaseError } from './errors/BaseError';
import { ServerRuntimeError } from './errors/ServerRuntimeError';
export declare type RPCOptions = {
    timeoutMs?: number;
};
export declare type APICall<RequestType extends BaseRequestType, ResponseType extends BaseResponseType, PossibleRuntimeErrorTypes extends Error, PossibleAPIClientError extends Error, name extends string> = (request: Omit<RequestType, '___BaseRequestType'>, rpcOptions?: RPCOptions) => Promise<Either<ServerRuntimeError<PossibleRuntimeErrorTypes> | PossibleAPIClientError, ResponseType>>;
export declare const DEFAULT_RPC_OPTIONS: RPCOptions;
export declare type GetAPICallType<APIType extends ReqRespAPIType<any, any, any, any>, ClientErrorTypes extends BaseError = BaseError> = APICall<UnpackReqRespAPIType<APIType>['RequestType'], UnpackReqRespAPIType<APIType>['ResponseType'], UnpackReqRespAPIType<APIType>['PossibleRuntimeErrorTypes'], ClientErrorTypes, UnpackReqRespAPIType<APIType>['name']>;
export declare abstract class BaseAPIClient<ClientErrorTypes extends BaseError = BaseError> {
    abstract __callAPI<APIType extends ReqRespAPIType<any, any, any, any>>(api: APIType, defaultRPCOptions?: RPCOptions): GetAPICallType<APIType, ClientErrorTypes>;
    callAPI<APIType extends ReqRespAPIType<any, any, any, any>>(api: APIType, defaultRPCOptions?: RPCOptions): (args: Pick<UnpackReqRespAPIType<APIType>["RequestType"], Exclude<keyof UnpackReqRespAPIType<APIType>["RequestType"], "___BaseRequestType">>, rpcOptions?: RPCOptions | undefined) => Promise<import("fp-ts/lib/Either").Right<0 | import("fp-ts/lib/Either").Left<ClientErrorTypes | ServerRuntimeError<UnpackReqRespAPIType<APIType>["PossibleRuntimeErrorTypes"]>> | import("fp-ts/lib/Either").Right<UnpackReqRespAPIType<APIType>["ResponseType"]>> | import("fp-ts/lib/Either").Left<any>>;
}
