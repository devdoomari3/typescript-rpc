import {
  BaseServerAPI,
} from '../BaseServer';
import {
  getUserPointAPI,
} from '../sampleAPIs/userAPIs';
export function setUserPointHandler(server: BaseServerAPI) {
  server.addAPI(getUserPointAPI, async req => {
    return {
      userId: req.userId,
      points: 1,
      ___BaseResponseType: null,
    };
  });
}
