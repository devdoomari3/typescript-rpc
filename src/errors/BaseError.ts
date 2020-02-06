export enum ErrorTypes {

}

export abstract class BaseError<
  CustomErrorTypes extends (string | never) = never
> extends Error {
  abstract __ErrorType: ErrorTypes | CustomErrorTypes;
}