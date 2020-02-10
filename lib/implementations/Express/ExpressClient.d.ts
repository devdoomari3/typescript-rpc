import { BaseAPIClient, RPCOptions, GetAPICallType } from '../../BaseAPIClient';
import { ReqRespAPIType } from '../../types';
export declare class HTTPAxiosClient extends BaseAPIClient {
    baseUrl: string;
    path: string;
    fullUrl: string;
    constructor(baseUrl: string, path?: string);
    __callAPI<APIType extends ReqRespAPIType<any, any, any, any>>(api: APIType, defaultRPCOptions?: RPCOptions | undefined): GetAPICallType<APIType>;
}
