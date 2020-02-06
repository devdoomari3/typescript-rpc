import {
  BaseRequestType,
  BaseResponseType,
  ReqRespAPIType,
} from './types';

export function createAPIDefinition<
  RequestType extends BaseRequestType,
  ResponseType extends BaseResponseType,
  PossibleRuntimeErrorTypes extends Error,
>() {
  function __withAPIName<
    name extends string
  >(name: name): ReqRespAPIType<
                  RequestType,
                  ResponseType,
                  PossibleRuntimeErrorTypes,
                  name
                > {
    return {
      name,
      APIType: 'ReqRespAPIType',
    };
  }

  return __withAPIName;
}
