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

  // call<
  //   RequestType extends CustomBaseRequestType,
  //   ResponseType extends BaseResponseType,
  //   name extends string,
  // > APICall<
  //   CustomBaseRequestType, RequestType, ResponseType, name,
  // >
  // abstract call: APICall<
}
