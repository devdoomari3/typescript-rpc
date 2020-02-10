/// <reference types="defer-promise" />
import { BaseAPIClient, GetAPICallType } from '../../BaseAPIClient';
import { BaseResponseType, ReqRespAPIType } from '../../types';
export declare class RendererIPCClient extends BaseAPIClient {
    responseHandlers: {
        [requestID: string]: DeferPromise.Deferred<BaseResponseType>;
    };
    __callAPI<APIType extends ReqRespAPIType<any, any, any, any>>(api: APIType): GetAPICallType<APIType>;
}
