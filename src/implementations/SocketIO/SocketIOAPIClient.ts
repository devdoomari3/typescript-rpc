import {
  autobind,
} from 'core-decorators';
import defer from 'defer-promise';
import uuidv4 from 'uuid/v4';
import {
  BaseRequestType,
  BaseResponseType,
  ReqRespAPIType,
  UnpackReqRespAPIType,
} from '../../types';

import {
  APICall,
  BaseAPIClient,
} from '../../BaseAPIClient';
import {
  EventTypes,
  SocketIORequestType,
  SocketIOResponseType,
} from './common';
import { ConnectionError } from '../../errors/ConnectionError';

@autobind
export class SocketIOAPIClient extends BaseAPIClient {
  responseHandlers: {
    [requestID: string]: DeferPromise.Deferred<BaseResponseType>;
  } = {};
  // FIXME: add 'requests queue' with timeout
  //   (queue of to-send-when-socket-connects requests)
  socket?: SocketIOClient.Socket;
  init(
    socket: SocketIOClient.Socket,
  ) {
    this.socket = socket;
    socket.on(EventTypes.RESPONSE, (data: SocketIOResponseType) => {
      const requestHandler = this.responseHandlers[data.requestId];
      requestHandler?.resolve(data.response);
    });
  }
  __callAPI<
    APIType extends ReqRespAPIType<any, any, any, any>
  >(
    api: APIType,
  ): APICall<
    UnpackReqRespAPIType<APIType>['RequestType'],
    UnpackReqRespAPIType<APIType>['ResponseType'],
    UnpackReqRespAPIType<APIType>['PossibleRuntimeErrorTypes'],
    UnpackReqRespAPIType<APIType>['name']
  > {
    return async (req) => {
      const requestId = uuidv4();
      const futureResponse = defer<
        UnpackReqRespAPIType<APIType>['ResponseType']
      >();
      this.responseHandlers[requestId] = futureResponse;
      const reqToSend: SocketIORequestType = {
        apiName: api.name,
        request: req as any,
        requestId,
      };
      if (this.socket && this.socket.connected) {
        this.socket.emit(EventTypes.REQUEST, reqToSend);
      } else {
        futureResponse.reject(new ConnectionError('SocketIOClient: ClientSocket not created or connected'));
      }

      return futureResponse.promise;
    };
  }
}
