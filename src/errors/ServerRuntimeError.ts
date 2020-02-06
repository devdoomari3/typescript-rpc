export class ServerRuntimeError<ActualError extends Error> extends Error {
  constructor(public actualError: ActualError) {
    super(`RuntimeError: ${actualError.message}`);
    this.stack = actualError.stack;
  }
}
