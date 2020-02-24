import * as t from 'io-ts';
import {
  createTypedError,
} from '../__base';

export const UnexpectedExecErrorArgs = t.type({
  errorName: t.string,
  errorStackTrace: t.array(t.string),
  errorArgs: t.any,
});

export const UnexpectedExecErrorDefinition = createTypedError(
  UnexpectedExecErrorArgs,
  'UnexpectedExecError',
);

export type UnexpectedExecErrorType = typeof UnexpectedExecErrorDefinition['_A'];

const a: UnexpectedExecErrorType = {
  _$args: {
    errorArgs: '',
    errorName: '',
    errorStackTrace: [],
  },
  _$errorName: 'UnexpectedExecError',
  _$type:'__KnownErrorType'
}
export class UnexpectedExecError implements UnexpectedExecErrorType {
  _$type: '__KnownErrorType' = '__KnownErrorType'
  _$errorName: 'UnexpectedExecError' = 'UnexpectedExecError'
  _$args: UnexpectedExecErrorType['_$args']
  static fromError(err: Error) {
    return new UnexpectedExecError({
      errorStackTrace: err.stack?.split('') || [],
      errorName: err.name,
      errorArgs: {},
    })
  }
  constructor(args: UnexpectedExecErrorType['_$args']) {
    this._$args = args
  }
}
