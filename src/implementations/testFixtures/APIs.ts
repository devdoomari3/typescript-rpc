import {
  createAPIDefinition,
} from '../../createAPI';
import {
  BaseRequestType, BaseResponseType,
} from '../../types';

export type EchoRequest = {
  echoReq: string;
} & BaseRequestType;

export type EchoResponse = {
  echoResp: string;
} & BaseResponseType;

export const echoAPI = createAPIDefinition<
  EchoRequest,
  EchoResponse
>()('echo');
