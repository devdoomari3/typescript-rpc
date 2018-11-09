import { APIType, BaseRequestType, BaseResponseType } from './types';

export function createAPIDefinition<
  RequestType extends BaseRequestType,
  ResponseType extends BaseResponseType
>() {
  function __withAPIName<
    name extends string
  >(name: name): APIType<RequestType, ResponseType, name> {
    return {
      name,
      __SINGLE_REQ_SINGLE_RESP: true,
      __requestTypeHolder: null as any,
      __responseTypeHolder: null as any,
    };
  }

  return __withAPIName;
}
