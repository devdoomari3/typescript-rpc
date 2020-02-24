import { runTestsForImplementation } from '../../testUtils/testAdapter';
import {
  echoAPINotConnectedTest,
  echoAPIServerSideError,
  echoAPITest,
} from '../testCases/echoAPI';
import {
  createClientServerPair,
} from './createClientServerPair';

runTestsForImplementation(
  [
    echoAPITest,
    echoAPIServerSideError,
  ],
  createClientServerPair({
    name: 'SocketIO Normal',
  }),
);

runTestsForImplementation(
  [echoAPINotConnectedTest],
  createClientServerPair({
    name: 'SocketIO disconnected API',
    disconnected: true,
  }),
);
