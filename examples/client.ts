import { getUserPointAPI, UserId } from './sampleAPIs/userAPIs'
import {
  createClientStub,
} from '../src/createClientStub'
export abstract class BaseClientImpl {

}

const userPointStub = createClientStub(getUserPointAPI)

async function test() {
  const resp = await userPointStub({
    userId: '1' as UserId,
  })
}