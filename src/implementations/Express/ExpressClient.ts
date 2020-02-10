import axios from 'axios';
import url from 'url';
import uuidv4 from 'uuid/v4';
import {
  APICall,
  BaseAPIClient,
  RPCOptions,
  GetAPICallType,
} from '../../BaseAPIClient';
import {
  ReqRespAPIType,
  UnpackReqRespAPIType,
} from '../../types';
import {
  DEFAULT_PATH, RequestBodyType,
} from './common';

export class HTTPAxiosClient extends BaseAPIClient {
  fullUrl: string;
  constructor(
    public baseUrl: string,
    public path: string = DEFAULT_PATH,
  ) {
    super();
    this.fullUrl = url.resolve(baseUrl, path);
  }
  __callAPI<
    APIType extends ReqRespAPIType<any, any, any, any>
  >(
    api: APIType,
    defaultRPCOptions?: RPCOptions | undefined,
  ): GetAPICallType<APIType> {
    return async (req) => {
      const requestId = uuidv4();
      const body = {
        funcName: api.name,
        args: req,
        requestId,
      } as RequestBodyType;
      const result = await axios.post<
        UnpackReqRespAPIType<APIType>['ResponseType']
      >(this.fullUrl, body);

      return result.data;
    };
  }

}
