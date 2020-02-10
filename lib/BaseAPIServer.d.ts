import { BaseResponseType, ReqRespAPIType, UnpackReqRespAPIType } from './types';
export declare type CleanedResponseType<T extends BaseResponseType = BaseResponseType> = Omit<T, '___BaseResponseType'>;
export declare abstract class BaseAPIServer {
    apiRunners: {
        [apiName: string]: (req: any) => Promise<CleanedResponseType>;
    };
    addAPI<APIType extends ReqRespAPIType<any, any, any, any>>(api: APIType, apiRunner: (req: UnpackReqRespAPIType<APIType>['RequestType']) => Promise<CleanedResponseType<UnpackReqRespAPIType<APIType>['ResponseType']>>): void;
    checkAPIAllImplemented(apis: {
        [name: string]: ReqRespAPIType<any, any, any, string>;
    }): void;
    abstract cleanUp(): void;
}
