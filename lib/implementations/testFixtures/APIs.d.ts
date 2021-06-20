import { ToRequestType, ToResponseType } from '../../types';
export declare type EchoRequest = ToRequestType<{
    echoReq: string;
}>;
export declare type EchoResponse = ToResponseType<{
    echoResp: string;
}>;
export declare const echoAPI: import("../../types").ReqRespAPIType<EchoRequest, EchoResponse, "echo">;
