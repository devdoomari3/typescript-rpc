import {
  createAPIDefinition,
} from '../../createAPI';
import {
  BaseRequestType, BaseResponseType,
  ToRequestType,
  ToResponseType,
} from '../../types';

export type EchoRequest = ToRequestType<{
  echoReq: string;
}>;

export type EchoResponse = ToResponseType<{
  echoResp: string;
}>;

export const echoAPI = createAPIDefinition<
  EchoRequest,
  EchoResponse
>()('echo');
