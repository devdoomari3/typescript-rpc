import axios from 'axios';
import {
  runTestsForImplementation,
} from '../../testUtils/testAdapter';
import { echoAPITest } from '../testCases/echoAPI';
import {
  packagedExpressImplForTest,
} from './createWrapperForTest';

axios.defaults.adapter = require('axios/lib/adapters/http');

runTestsForImplementation(
  [echoAPITest],
  packagedExpressImplForTest,
);
