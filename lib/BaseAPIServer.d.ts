import { BaseResponseType, ReqRespAPIType, UnpackReqRespAPIType } from './types';
export declare type CleanedResponseType<T extends BaseResponseType = BaseResponseType> = Omit<T, '___BaseResponseType'>;
export declare abstract class BaseAPIServer {
    handlers: {
        [apiName: string]: (req: any) => Promise<CleanedResponseType>;
    };
    addAPI<APIType extends ReqRespAPIType<any, any, any>>(api: APIType, handler: (req: UnpackReqRespAPIType<APIType>['RequestType']) => Promise<CleanedResponseType<UnpackReqRespAPIType<APIType>['ResponseType']>>): void;
    checkAPIAllImplemented(apis: {
        [name: string]: ReqRespAPIType<any, any, string>;
    }): void;
    abstract cleanUp(): void;
}
