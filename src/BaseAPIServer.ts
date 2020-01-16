import {
  ReqRespAPIType,
  BaseRequestType,
  BaseResponseType,
  UnpackReqRespAPIType,
} from './types';

export type CleanedResponseType<
  T extends BaseResponseType = BaseResponseType,
> = Omit<T, '___BaseResponseType'>;

export abstract class BaseAPIServer {
  handlers: {
    [apiName: string]: (req: any) => Promise<CleanedResponseType>;
  } = {};
  addAPI<
    APIType extends ReqRespAPIType<any, any, any>
  >(
    api: APIType,
    handler: (
      req: UnpackReqRespAPIType<APIType>['RequestType'],
    ) => Promise<CleanedResponseType<UnpackReqRespAPIType<APIType>['ResponseType']>>,
  ) {
    this.handlers[api.name] = handler;
  }
  checkAPIAllImplemented(apis: {
    [name: string]: ReqRespAPIType<any, any, string>;
  }) {
    Object.keys(apis).forEach(key => {
      const api = apis[key];
      if (
        api.type === 'ReqRespAPIType' &&
        !this.handlers[api.name]
      ) throw new Error(`HANDLER NOT IMPLEMENTED FOR: ${api.name}`);
    });
  }
  abstract cleanUp(): void;
}
