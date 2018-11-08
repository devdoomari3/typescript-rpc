import express from 'express';
import { Server } from 'http';
import socketio from 'socket.io';
import { BaseAPIServer } from '../BaseServer';

const app = express();

const server: Server = app.listen(1000);

export class SocketIOAPIServer extends BaseAPIServer {
  constructor() {
    super();
  }
}
