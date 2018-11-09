
export type BaseRequestType = {
  ___BaseRequestType: null;
};

export type BaseResponseType = {
  ___BaseResponseType: null;
};

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
