export type IPCArgsType<T = any> = {
  funcArgs: T;
  funcName: string;
  requestId?: string;
};

export type IPCSuccessReturn<T> = {
  funcReturn: T;
  success: true;
};

export type IPCErrorReturn = {
  error: any;
  success: false;
};

export const channelName = 'ElectronIPCRendererToMain_Req';
