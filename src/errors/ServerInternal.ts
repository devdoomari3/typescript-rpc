import * as t from 'io-ts';

import { createTypedError } from './__base';

export const ServerInternalErrorArgs = t.type({
  error: t.any,
});

export const ServerInternalErrorDefinition = createTypedError(
  ServerInternalErrorArgs,
  'Server Internal Error',
);

export type ServerInternalErrorType = typeof ServerInternalErrorDefinition._A