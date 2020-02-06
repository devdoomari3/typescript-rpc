/// <reference types="node" />
import http from 'http';
export declare function startHTTPServer(httpServer: http.Server, port: number, host?: string): Promise<http.Server>;
export declare function stopHTTPServer(httpServer: http.Server): Promise<unknown>;
