
export type BaseRequestType = {
  ___BaseRequestType: null;
};

export type ToRequestType<T> = T & BaseRequestType;

export type BaseResponseType = {
  ___BaseResponseType: null;
};

export type ToResponseType<T> = T & BaseResponseType;

export type APIType<
  RequestType extends BaseRequestType,
  ResponseType extends BaseResponseType,
  name extends string
> = {
  __requestTypeHolder: RequestType;
  __responseTypeHolder: ResponseType;
  name: name;
  __SINGLE_REQ_SINGLE_RESP: true; // 1 request --> 1 response
};

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
