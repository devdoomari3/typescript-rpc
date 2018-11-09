import {
  APIType,
  BaseRequestType,
  BaseResponseType,
} from '../src/types';
import {
  getUserPointAPI,
  UserId,
} from './sampleAPIs/userAPIs';

import {
  APICall,
  BaseAPIClient,
} from '../src/BaseAPIClient';

type CustomBaseRequestType = BaseRequestType;
export class ClientAPI extends BaseAPIClient {
  call<
    RequestType extends CustomBaseRequestType,
    ResponseType extends BaseResponseType,
    name extends string,
  >(
    api: APIType<RequestType, ResponseType, name>,
  ): APICall<
    typeof api.__requestTypeHolder,
    typeof api.__responseTypeHolder,
    name
  > {
    return async (req) => {
      return null as any;
    };
  }

}

const guestClientAPI = new ClientAPI();

const getUserPoint = guestClientAPI.call(
  getUserPointAPI,
);

getUserPoint({
  userId: '1' as UserId,
});
