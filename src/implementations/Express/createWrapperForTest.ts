import bodyParser from 'body-parser';
import Express from 'express';
import getPort from 'get-port';
import http from 'http';
import { startHTTPServer, stopHTTPServer } from '../../testUtils/httpServer';
import { PackagedImplementationForTest } from '../../testUtils/testAdapter';
import { HTTPAxiosClient } from './ExpressClient';
import { ExpressAPIServer } from './ExpressServer';

export const packagedExpressImplForTest: PackagedImplementationForTest = {
  name: 'ExpressJS_Implementation',
  async createImplementationInstance() {
    const app = Express();
    app.use(bodyParser.json());
    const port = await getPort();
    const httpServer = await startHTTPServer(
      http.createServer(app),
      port,
  );
    const APIServer = new ExpressAPIServer(app);
    const APIClient = new HTTPAxiosClient(
    `http://127.0.0.1:${port}/`,
  );

    return {
      APIServer,
      APIClient,
      async cleanUp() {
        await stopHTTPServer(httpServer);
      },
      name: 'ExpressJS_Impl',
    };
  },
};
