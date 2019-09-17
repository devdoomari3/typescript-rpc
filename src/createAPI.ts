import { ReqRespAPIType, BaseRequestType, BaseResponseType } from './types';

export function createAPIDefinition<
  RequestType extends BaseRequestType,
  ResponseType extends BaseResponseType
>() {
  function __withAPIName<
    name extends string
  >(name: name): ReqRespAPIType<RequestType, ResponseType, name> {
    return {
      name,
      type: 'ReqRespAPIType',
    };
  }

  return __withAPIName;
}
