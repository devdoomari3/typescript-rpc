import { runTestsForImplementation } from '../../testUtils/testAdapter';
import { echoAPITest } from '../testCases/echoAPI';
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
  [echoAPITest],
  createClientServerPair({
    name: 'SocketIO disconnected API',
    disconnected: true,
  }),
);