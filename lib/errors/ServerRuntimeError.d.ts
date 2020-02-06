export declare class ServerRuntimeError<ActualError extends Error> extends Error {
    actualError: ActualError;
    constructor(actualError: ActualError);
}
