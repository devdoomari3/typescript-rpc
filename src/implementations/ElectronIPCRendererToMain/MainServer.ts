import { autobind } from 'core-decorators';
import { ipcMain } from 'electron';
import { BaseAPIServer } from '../../BaseAPIServer';

@autobind
export class MainIPCServer extends BaseAPIServer {

  cleanUp(): void {
    throw new Error('Method not implemented.');
  }
}
