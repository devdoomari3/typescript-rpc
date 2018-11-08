import {
  Omit,
} from 'typelevel-ts';
import {
  APIType,
  BaseRequestType,
  BaseResponseType,
} from '../src/types';

export type ClientStubType<
  RequestType extends BaseRequestType,
  ResponseType extends BaseResponseType,
> = (req: Omit<RequestType, '___BaseRequestType'>) => Promise<ResponseType>;
export function createClientStub<
  RequestType extends BaseRequestType,
  ResponseType extends BaseResponseType,
  name extends string
> (
  api: APIType<RequestType, ResponseType, name>,
  // clientImplementation: BaseClientImpl,
): ClientStubType<RequestType, ResponseType> {
  return async req => {
    return null as any;
  };
}
