export const DEFAULT_PATH = 'rpc_call';

export type RequestBodyType<ArgsType = any> = {
  funcName: string;
  args: ArgsType;
  requestId?: string;
}