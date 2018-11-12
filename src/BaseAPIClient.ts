import { Omit } from 'typelevel-ts';
import {
  APIType,
  BaseRequestType,
  BaseResponseType,
} from './types';

export type APICall<
  RequestType extends CustomBaseRequestType,
  ResponseType extends BaseResponseType,
  name extends string,
  CustomBaseRequestType extends BaseRequestType = BaseRequestType,
> = (
  request: Omit<RequestType, '___BaseRequestType'>,
) => Promise<ResponseType>;

export abstract class BaseAPIClient<
  CustomBaseRequestType
    extends BaseRequestType
     = BaseRequestType
> {
  abstract useAPI<
    RequestType extends CustomBaseRequestType,
    ResponseType extends BaseResponseType,
    name extends string,
  >(
    api: APIType<RequestType, ResponseType, name>,
  ): APICall<
    typeof api.__requestTypeHolder,
    typeof api.__responseTypeHolder,
    name,
    CustomBaseRequestType
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
