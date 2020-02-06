import { autobind } from 'core-decorators';
import { ipcMain } from 'electron';
import { BaseAPIServer } from '../../BaseAPIServer';
import {
  channelName,
  IPCArgsType,
  IPCErrorReturn,
  IPCSuccessReturn,
} from './common';

@autobind
export class MainIPCServer extends BaseAPIServer {
  constructor() {
    super();
    ipcMain.on(channelName, async (event, ipcArgs: IPCArgsType) => {
      const handler = this.handlers[ipcArgs.funcName];
      if (!handler) {
        event.reply({
          error: `NO SERVER IMPLEMENTATION FOR ${ipcArgs.funcName}`,
          success: false,
        } as IPCErrorReturn);
        throw new Error('Undefined ');
      }
      try {
        const result = await handler(ipcArgs.funcArgs);
        const resp: IPCSuccessReturn<any> = {
          funcReturn: result,
          success: true,
        };
        event.reply(resp);
      } catch (e) {
        event.reply({
          error: e,
          success: false,
        } as IPCErrorReturn);
      }

    });
  }
  cleanUp(): void {
    throw new Error('Method not implemented.');
  }
}
