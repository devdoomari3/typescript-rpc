import { BaseRequestWithProgressType, BaseResponseType, WithProgressAPIType } from './types';
export declare function createAPIWithProgressDefinition<RequestType extends BaseRequestWithProgressType, ResponseType extends BaseResponseType>(): <name extends string>(name: name) => WithProgressAPIType<RequestType, ResponseType, name>;
