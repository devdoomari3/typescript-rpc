import { runTestsForImplementation } from '../../testUtils/testAdapter';
import { echoAPINotConnectedTest, echoAPITest } from '../testCases/echoAPI';
import {
  createClientServerPair,
} from './createClientServerPair';

runTestsForImplementation(
  [echoAPITest],
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
