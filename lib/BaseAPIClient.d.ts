import { Omit } from 'typelevel-ts';
import { ReqRespAPIType, BaseRequestType, BaseResponseType, UnpackReqRespAPIType } from './types';
export declare type APICall<RequestType extends BaseRequestType, ResponseType extends BaseResponseType, name extends string> = (request: Omit<RequestType, '___BaseRequestType'>) => Promise<ResponseType>;
export declare abstract class BaseAPIClient {
    abstract useAPI<APIType extends ReqRespAPIType<any, any, any>>(api: APIType): APICall<UnpackReqRespAPIType<APIType>['RequestType'], UnpackReqRespAPIType<APIType>['ResponseType'], UnpackReqRespAPIType<APIType>['name']>;
}
