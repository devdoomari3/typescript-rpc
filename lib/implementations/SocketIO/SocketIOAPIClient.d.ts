/// <reference types="defer-promise" />
import { Socket as SocketIOClientSocket } from 'socket.io-client';
import { ReqRespAPIType, BaseResponseType, UnpackReqRespAPIType } from '../../types';
import { APICall, BaseAPIClient } from '../../BaseAPIClient';
export declare class SocketIOAPIClient extends BaseAPIClient {
    socket: SocketIOClientSocket;
    responseHandlers: {
        [requestID: string]: DeferPromise.Deferred<BaseResponseType>;
    };
    constructor(socket: SocketIOClientSocket);
    useAPI<APIType extends ReqRespAPIType<any, any, any>>(api: APIType): APICall<UnpackReqRespAPIType<APIType>['RequestType'], UnpackReqRespAPIType<APIType>['ResponseType'], UnpackReqRespAPIType<APIType>['name']>;
    cleanUp(): void;
}
