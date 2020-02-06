import { TestDefinition } from '../../testUtils/testAdapter';
import { ToRequestType, ToResponseType } from '../../types';
export declare type EchoRequest = ToRequestType<{
    echoReq: string;
}>;
export declare type EchoResponse = ToResponseType<{
    echoResp: string;
}>;
export declare const echoAPI: import("../../types").ReqRespAPIType<ToRequestType<{
    echoReq: string;
}>, ToResponseType<{
    echoResp: string;
}>, Error, "echo">;
export declare const echoAPITest: TestDefinition;
export declare const echoAPINotConnectedTest: TestDefinition;
