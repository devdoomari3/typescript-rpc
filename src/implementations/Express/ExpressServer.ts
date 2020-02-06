import * as Express from 'express';
import { BaseAPIServer } from '../../BaseAPIServer';
import { DEFAULT_PATH, RequestBodyType } from './common';

export class ExpressAPIServer extends BaseAPIServer {
  constructor(
    public expressApp: Express.Application,
    options?: {
      urlPath?: string;
    },
  ) {
    super();
    expressApp.post(
      `/${DEFAULT_PATH}`,
      // options?.urlPath ?? DEFAULT_PATH,
      async (req, resp) => {
        const {
          funcName,
          args,
        } = req.body as RequestBodyType;
        const handler = this.handlers[funcName];
        try {
          const result = await handler(args);
          resp
            .status(200)
            .send(result);
        } catch (e) {
          console.error(e);
          resp
            .status(500)
            .send('aaa');
        }

      },
    );
  }
  cleanUp(): void {
    throw new Error('Method not implemented.');
  }

}
