
import * as t from 'io-ts';
export type BaseRequestType = {
  ___BaseRequestType: null;
};

export type ToRequestType<T> = T & BaseRequestType;

export type BaseResponseType = {
  ___BaseResponseType: boolean;
};

export type ToResponseType<T> = T & BaseResponseType;

export type ReqRespAPIType<
  RequestType extends BaseRequestType,
  ResponseType extends BaseResponseType,
  name extends string,
  RuntimeErrorTypes extends t.Mixed = t.Any,
> = {
  name: name;
  APIType: 'ReqRespAPIType';
  runtimeErrorTypes?: RuntimeErrorTypes;
};

export type UnpackReqRespAPIType<
  T extends ReqRespAPIType<any, any, any, any>
> = T extends ReqRespAPIType<
                infer RequestType,
                infer ResponseType,
                infer name,
                infer RuntimeErrorTypes
              > ? {
                RequestType: RequestType;
                ResponseType: ResponseType;
                name: name;
                RuntimeErrorTypes: RuntimeErrorTypes;
              } : never;

export type StreamedAPIType<
  RequestType extends BaseRequestType,
  ResponseType extends BaseResponseType,
  name extends string
> = {
  request?: RequestType;
  response?: ResponseType;
  name: name;
  __SINGLE_REQ_MULTIPLE_RESP: true; // 1 request --> 1 response
};

export type BaseRequestWithProgressType = {
  __RequestWithProgress: null;
  onProgress(progress: ProgressEvent): void;
};

export type WithProgressAPIType<
  RequestWithProgressType extends BaseRequestWithProgressType,
  ResponseType extends BaseResponseType,
  name extends string
> = {
  __requestTypeHolder: RequestWithProgressType;
  __responseTypeHolder: ResponseType;
  name: name;
  __withProgressAPIType: true;
};
