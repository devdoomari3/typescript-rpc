import * as t from 'io-ts';
import { option } from 'io-ts-types/lib/option';
import {
  createTypedError,
} from '../__base';

export const NotConnectedErrorArgs = t.partial({
  givenTimeMs: option(t.number),
});

export const NotConnectedErrorDefinition = createTypedError(
  NotConnectedErrorArgs,
  'NotConnected',
);

export type NotConnectedErrorType = typeof NotConnectedErrorDefinition['_A'];
