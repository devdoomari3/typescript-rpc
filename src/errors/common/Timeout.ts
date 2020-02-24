import * as t from 'io-ts';
import {
  createTypedError,
} from '../__base';

export const TimeoutErrorArgs = t.partial({
  givenTimeMs: t.number,
});

export const TimeoutErrorDefinition = createTypedError(
  TimeoutErrorArgs,
  'TimeoutError',
);

export type TimeoutErrorType = typeof TimeoutErrorDefinition['_A'];
