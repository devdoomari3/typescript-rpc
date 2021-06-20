import {
  ReqRespAPIType,
  BaseRequestType,
  BaseResponseType,
  UnpackReqRespAPIType,
} from './types';

export type APICall<
  RequestType extends BaseRequestType,
  ResponseType extends BaseResponseType,
  name extends string,
> = (
  request: Omit<RequestType, '___BaseRequestType'>,
) => Promise<ResponseType>;

export abstract class BaseAPIClient {
  abstract useAPI<
    APIType extends ReqRespAPIType<any, any, any>
  >(
    api: APIType,
  ): APICall<
    UnpackReqRespAPIType<APIType>['RequestType'],
    UnpackReqRespAPIType<APIType>['ResponseType'],
    UnpackReqRespAPIType<APIType>['name']
  >;
}
