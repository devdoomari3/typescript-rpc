import {
  BaseAPIServer,
} from '../../src/BaseAPIServer';
import {
  getUserPointAPI,
} from '../sampleAPIs/userAPIs';
export function setUserPointHandler(server: BaseAPIServer) {
  server.addAPI(
    getUserPointAPI,
    async req => {
      return {
        userId: req.userId,
        points: 1,
        ___BaseResponseType: true,
      };
    },
  );
}
