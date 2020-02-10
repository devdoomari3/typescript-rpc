/// <reference types="defer-promise" />
/// <reference types="socket.io-client" />
import { BaseResponseType, ReqRespAPIType } from '../../types';
import { BaseAPIClient, GetAPICallType } from '../../BaseAPIClient';
export declare class SocketIOAPIClient extends BaseAPIClient {
    responseHandlers: {
        [requestID: string]: DeferPromise.Deferred<BaseResponseType>;
    };
    socket?: SocketIOClient.Socket;
    init(socket: SocketIOClient.Socket): void;
    __callAPI<APIType extends ReqRespAPIType<any, any, any, any>>(api: APIType): GetAPICallType<APIType>;
}
