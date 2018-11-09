import {
  Enum,
} from 'typescript-string-enums';
import {
  BaseRequestType,
  BaseResponseType,
} from '../../types';

export type RequestIdType = string & {
  ___RequestId: null;
};

export type SocketIORequestType = {
  apiName: string;
  requestId: RequestIdType;
  request: BaseRequestType;
};

export type SocketIOResponseType = {
  apiName: string;
  requestId: RequestIdType;
  response: BaseResponseType;
};

export const EventTypes = Enum(
  'RESPONSE',
  'REQUEST',
);

export type EventTypes = Enum<typeof EventTypes>;
