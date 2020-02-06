/// <reference types="defer-promise" />
import { APICall, BaseAPIClient } from '../../BaseAPIClient';
import { BaseResponseType, ReqRespAPIType, UnpackReqRespAPIType } from '../../types';
export declare class RendererIPCClient extends BaseAPIClient {
    responseHandlers: {
        [requestID: string]: DeferPromise.Deferred<BaseResponseType>;
    };
    __callAPI<APIType extends ReqRespAPIType<any, any, any, any>>(api: APIType): APICall<UnpackReqRespAPIType<APIType>['RequestType'], UnpackReqRespAPIType<APIType>['ResponseType'], UnpackReqRespAPIType<APIType>['PossibleRuntimeErrorTypes'], UnpackReqRespAPIType<APIType>['name']>;
}
