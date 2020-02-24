import { Either, left, mapLeft } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { pipe } from 'ramda';

export type __KnownErrorType = {
  __KnownErrorType: null;
}

export function asKnownError<T extends t.Mixed>(a: T) {
  return a as T & __KnownErrorType;
}

export type _ErrorDefinitionType<C extends t.Mixed, name extends string> = t.TypeC<{
  _$type: t.LiteralC<'__KnownErrorType'>;
  _$errorName: t.LiteralC<name>;
  _$args: C;
}>;

export function createTypedError<
  C extends t.Mixed,
  name extends string
>(codec: C, name: name): _ErrorDefinitionType<C, name> {
  return t.type({
    _$type: t.literal('__KnownErrorType'),
    _$errorName: t.literal(name),
    _$args: codec,
  });
}

export function createErrorDecoder<
  KnownErrorsType extends [
    _ErrorDefinitionType<any, any>,
    _ErrorDefinitionType<any, any>,
    ...ReadonlyArray<_ErrorDefinitionType<any, any>>
  ]
> (
  knownErrors: KnownErrorsType,
) {
  const errorsUnion = asKnownError(t.union(knownErrors))

  function tryDecode<T>(
    err: T,
    failLogger?: (e: T | t.Errors) => void,
  ): Either<T, KnownErrorsType[number]['_A']> {
    if ((err as any)?._$type !== '__KnownErrorType') {
      failLogger?.(err);

      return left(err);
    }

    return pipe(
      errorsUnion.decode,
      mapLeft(e => {
        failLogger?.(e);

        return err;
      }),
    )(err);
  }

  return {
    tryDecode,
    errorsUnion,
  }
}

