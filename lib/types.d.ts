export declare type BaseRequestType = {
    ___BaseRequestType: null;
};
export declare type ToRequestType<T> = T & BaseRequestType;
export declare type BaseResponseType = {
    ___BaseResponseType: null;
};
export declare type ToResponseType<T> = T & BaseResponseType;
export declare type ReqRespAPIType<RequestType extends BaseRequestType, ResponseType extends BaseResponseType, name extends string> = {
    name: name;
    APIType: 'ReqRespAPIType';
};
export declare type UnpackReqRespAPIType<T extends ReqRespAPIType<any, any, any>> = T extends ReqRespAPIType<infer RequestType, infer ResponseType, infer name> ? {
    RequestType: RequestType;
    ResponseType: ResponseType;
    name: name;
} : never;
export declare type StreamedAPIType<RequestType extends BaseRequestType, ResponseType extends BaseResponseType, name extends string> = {
    request?: RequestType;
    response?: ResponseType;
    name: name;
    __SINGLE_REQ_MULTIPLE_RESP: true;
};
export declare type BaseRequestWithProgressType = {
    __RequestWithProgress: null;
    onProgress(progress: ProgressEvent): void;
};
export declare type WithProgressAPIType<RequestWithProgressType extends BaseRequestWithProgressType, ResponseType extends BaseResponseType, name extends string> = {
    __requestTypeHolder: RequestWithProgressType;
    __responseTypeHolder: ResponseType;
    name: name;
    __withProgressAPIType: true;
};
