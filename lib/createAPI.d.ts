import { BaseRequestType, BaseResponseType, ReqRespAPIType } from './types';
export declare function createAPIDefinition<RequestType extends BaseRequestType, ResponseType extends BaseResponseType, PossibleRuntimeErrorTypes extends Error>(): <name extends string>(name: name) => ReqRespAPIType<RequestType, ResponseType, PossibleRuntimeErrorTypes, name>;
