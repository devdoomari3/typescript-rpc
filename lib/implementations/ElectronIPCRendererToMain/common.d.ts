export declare type IPCArgsType<T = any> = {
    funcArgs: T;
    funcName: string;
    requestId?: string;
};
export declare type IPCSuccessReturn<T> = {
    funcReturn: T;
    success: true;
};
export declare type IPCErrorReturn = {
    error: any;
    success: false;
};
export declare const channelName = "ElectronIPCRendererToMain_Req";
