import { ReqRespAPIType, BaseRequestType, BaseResponseType } from './types';
export declare function createAPIDefinition<RequestType extends BaseRequestType, ResponseType extends BaseResponseType>(): <name extends string>(name: name) => ReqRespAPIType<RequestType, ResponseType, name>;
