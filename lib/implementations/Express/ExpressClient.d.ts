import { APICall, BaseAPIClient, RPCOptions } from '../../BaseAPIClient';
import { ReqRespAPIType, UnpackReqRespAPIType } from '../../types';
export declare class HTTPAxiosClient extends BaseAPIClient {
    baseUrl: string;
    path: string;
    fullUrl: string;
    constructor(baseUrl: string, path?: string);
    __callAPI<APIType extends ReqRespAPIType<any, any, any, any>>(api: APIType, defaultRPCOptions?: RPCOptions | undefined): APICall<UnpackReqRespAPIType<APIType>['RequestType'], UnpackReqRespAPIType<APIType>['ResponseType'], UnpackReqRespAPIType<APIType>['PossibleRuntimeErrorTypes'], UnpackReqRespAPIType<APIType>['name']>;
}
