import {
  BaseRequestWithProgressType,
  BaseResponseType,
  WithProgressAPIType,
} from './types';

export function createAPIWithProgressDefinition<
  RequestType extends BaseRequestWithProgressType,
  ResponseType extends BaseResponseType
>() {
  function __withAPIName<
    name extends string
  >(name: name): WithProgressAPIType<RequestType, ResponseType, name> {
    return {
      name,
      __requestTypeHolder: null as any,
      __responseTypeHolder: null as any,
      __withProgressAPIType: true,
    };
  }

  return __withAPIName;
}
