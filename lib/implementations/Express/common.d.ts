export declare const DEFAULT_PATH = "rpc_call";
export declare type RequestBodyType<ArgsType = any> = {
    funcName: string;
    args: ArgsType;
    requestId?: string;
};
