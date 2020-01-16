import { Enum } from 'typescript-string-enums';
import { BaseRequestType, BaseResponseType } from '../../types';
export declare type RequestIdType = string;
export declare type SocketIORequestType = {
    apiName: string;
    requestId: RequestIdType;
    request: BaseRequestType;
};
export declare type SocketIOResponseType = {
    apiName: string;
    requestId: RequestIdType;
    response: BaseResponseType;
};
export declare const EventTypes: {
    RESPONSE: "RESPONSE";
    REQUEST: "REQUEST";
};
export declare type EventTypes = Enum<typeof EventTypes>;
