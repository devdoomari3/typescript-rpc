/// <reference types="socket.io-client" />
import { PackagedImplementationForTest as ClientServerPair } from '../../testUtils/testAdapter';
export declare function clientConnect({ uri, dontCheckConnected, }: {
    uri: string;
    dontCheckConnected?: boolean;
}): Promise<SocketIOClient.Socket>;
export declare function createClientServerPair(args?: {
    name?: string;
    disconnected?: boolean;
}): ClientServerPair;
