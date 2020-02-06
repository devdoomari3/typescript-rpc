import * as Express from 'express';
import { BaseAPIServer } from '../../BaseAPIServer';
export declare class ExpressAPIServer extends BaseAPIServer {
    expressApp: Express.Application;
    constructor(expressApp: Express.Application, options?: {
        urlPath?: string;
    });
    cleanUp(): void;
}
