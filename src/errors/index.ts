
import { TimeoutErrorDefinition } from './common/Timeout';
import { createErrorDecoder } from './__base'
import { ServerInternalErrorDefinition } from './ServerInternal';

export const defaultKnownErrors = createErrorDecoder([
  TimeoutErrorDefinition,
  ServerInternalErrorDefinition,
])