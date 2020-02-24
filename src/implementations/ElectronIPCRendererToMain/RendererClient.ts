import defer from 'defer-promise';
import { ipcRenderer } from 'electron';
import uuidv4 from 'uuid/v4';
import {
  APICall,
  BaseAPIClient,
  GetAPICallType,
} from '../../BaseAPIClient';
import { defaultKnownErrors } from '../../errors';
import {
  BaseResponseType,
  ReqRespAPIType,
  UnpackReqRespAPIType,
} from '../../types';
import { channelName, IPCArgsType } from './common';

export class RendererIPCClient extends BaseAPIClient {
  responseHandlers: {
    [requestID: string]: DeferPromise.Deferred<BaseResponseType>;
  } = {};
  __callAPI<
    APIType extends ReqRespAPIType<any, any, any, any>
  >(
    api: APIType,
  ): GetAPICallType<APIType> {
    return async (req) => {
      const requestId = uuidv4();
      const futureResponse = defer<
        UnpackReqRespAPIType<APIType>['ResponseType']
      >();
      this.responseHandlers[requestId] = futureResponse;
      const reqToSend: IPCArgsType = {
        funcArgs: req,
        funcName: api.name,
        requestId,
      };
      ipcRenderer.send(channelName, reqToSend);

      return futureResponse.promise;
    };
  }

}
