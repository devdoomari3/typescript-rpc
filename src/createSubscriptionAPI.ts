import {
  BaseRequestType,
  BaseResponseType,
  StreamedAPIType,
} from './types';

import {
  UserPointRequestType,
  UserPointResponseType,
} from './sampleAPIs/userAPIs';

export function createStreamedAPI<
  RequestType extends BaseRequestType,
  ResponseType extends BaseResponseType
> () {
  function withName<
    name extends string
  >(name: name): StreamedAPIType<RequestType, ResponseType, name> {
    return {
      name,
      __SINGLE_REQ_MULTIPLE_RESP: true,
    };
  }

  return withName;
}

export class BaseSubscriptionHandler<
  RequestType extends BaseRequestType,
  ResponseType extends BaseResponseType,
  name extends string
> {
  onInit?: (req: RequestType) => Promise<void>;
  onCleanup?: (req: RequestType) => void;
}

export function createSubscriptionHandler<
  RequestType extends BaseRequestType,
  ResponseType extends BaseResponseType,
  name extends string
> (args: {
  api: StreamedAPIType<RequestType, ResponseType, name>;
  onInit(req: RequestType): Promise<void>;
  onClose(req: RequestType): void;
}): new () => BaseSubscriptionHandler<RequestType, ResponseType, name> {
  class SubscriptionHandler extends BaseSubscriptionHandler<
    RequestType, ResponseType, name
  > {

  }

  return SubscriptionHandler;
}
const api = createStreamedAPI<UserPointRequestType, UserPointResponseType>()('userpoint');
const apiHandler = createSubscriptionHandler({
  api,
  async onInit(req) {

  },
  async onClose(req) {

  },
});
