import {
  Enum,
} from 'typescript-string-enums';
import {
  BaseRequestType,
  BaseResponseType,
} from '../../types';

export type RequestIdType = string;

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

export type SocketIOErrorResponseType = {
  apiName: string;
  requestId: RequestIdType;
  errorResponse: any;
}

export const EventTypes = Enum(
  'RESPONSE',
  'REQUEST',
  'UnexpectedExecError',
  'KnownExecError',
);

export type EventTypes = Enum<typeof EventTypes>;
