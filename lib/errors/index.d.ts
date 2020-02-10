import { ServerRuntimeError } from './ServerRuntimeError';
import { TimeoutError } from './Timeout';
export declare type PossibleErrorTypes<RuntimeError extends Error = any> = ServerRuntimeError<RuntimeError> | TimeoutError | never;
