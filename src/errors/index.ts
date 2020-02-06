import { ServerRuntimeError } from './ServerRuntimeError';
import { TimeoutError } from './Timeout';

export type PossibleErrorTypes<RuntimeError extends Error = any> =
  ServerRuntimeError<RuntimeError> |
  TimeoutError |
  never
;
