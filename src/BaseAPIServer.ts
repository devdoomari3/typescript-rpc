import {
  BaseRequestType,
  BaseResponseType,
  ReqRespAPIType,
  UnpackReqRespAPIType,
} from './types';

export type CleanedResponseType<
  T extends BaseResponseType = BaseResponseType,
> = Omit<T, '___BaseResponseType'>;

export abstract class BaseAPIServer {
  apiRunners: {
    [apiName: string]: (req: any) => Promise<CleanedResponseType>;
  } = {};
  addAPI<
    APIType extends ReqRespAPIType<any, any, any, any>
  >(
    api: APIType,
    apiRunner: (
      req: UnpackReqRespAPIType<APIType>['RequestType'],
    ) => Promise<CleanedResponseType<UnpackReqRespAPIType<APIType>['ResponseType']>>,
  ) {
    this.apiRunners[api.name] = apiRunner;
  }
  checkAPIAllImplemented(apis: {
    [name: string]: ReqRespAPIType<any, any, string>;
  }) {
    Object.keys(apis)
      .forEach(key => {
        const api = apis[key];
        if (
          api.APIType === 'ReqRespAPIType' &&
          !this.apiRunners[api.name]
        ) throw new Error(`HANDLER NOT IMPLEMENTED FOR: ${api.name}`);
      });
  }
  abstract cleanUp(): void;
}
