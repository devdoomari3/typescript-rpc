/// <reference types="defer-promise" />
/// <reference types="socket.io-client" />
import { ReqRespAPIType, BaseResponseType, UnpackReqRespAPIType } from '../../types';
import { APICall, BaseAPIClient } from '../../BaseAPIClient';
export declare class SocketIOAPIClient extends BaseAPIClient {
    responseHandlers: {
        [requestID: string]: DeferPromise.Deferred<BaseResponseType>;
    };
    socket?: SocketIOClient.Socket;
    init(socket: SocketIOClient.Socket): void;
    useAPI<APIType extends ReqRespAPIType<any, any, any>>(api: APIType): APICall<UnpackReqRespAPIType<APIType>['RequestType'], UnpackReqRespAPIType<APIType>['ResponseType'], UnpackReqRespAPIType<APIType>['name']>;
}
