import * as t from 'io-ts'
import {
  BaseRequestType,
  BaseResponseType,
  ReqRespAPIType,
} from './types';

export function createAPIDefinition<
  RequestType extends BaseRequestType,
  ResponseType extends BaseResponseType,
>() {
  function __withAPIName<
    name extends string,
    RuntimeErrorTypes extends t.Mixed = t.Any,
  >(
    name: name,
    runtimeErrorTypes?: RuntimeErrorTypes,
  ): ReqRespAPIType<
      RequestType,
      ResponseType,
      name,
      RuntimeErrorTypes
    > {
    return {
      name,
      APIType: 'ReqRespAPIType',
      runtimeErrorTypes,
    };
  }

  return __withAPIName;
}
