import {
  APIType,
  BaseRequestType,
  BaseResponseType,
} from '../../types';

import {
  APICall,
  BaseAPIClient,
} from '../../BaseAPIClient';

import socketioClient from 'socket.io-client';

const a = socketioClient('aa');
export class SocketIOAPIClient<
  CustomBaseRequestType extends BaseRequestType = BaseRequestType
> extends BaseAPIClient<CustomBaseRequestType> {
  responseHandlers: {
    [requestID: string]: Promise<BaseResponseType>;
  } = {};
  constructor(
    public socket: SocketIOClient.Socket,
  ) {
    super();

  }
  createResponseHandler() {

  }
  call<
    RequestType extends CustomBaseRequestType,
    ResponseType extends BaseResponseType,
    name extends string,
  >(
    api: APIType<RequestType, ResponseType, name>,
  ): APICall<
    typeof api.__requestTypeHolder,
    typeof api.__responseTypeHolder,
    name
  > {
    return async (req) => {
      this.socket.send(api.name, req);
    };
  }
}
