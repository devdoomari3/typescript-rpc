import { PackagedImplementationForTest as ClientServerPair } from '../../testUtils/testAdapter';
export declare function createClientServerPair(args?: {
    name?: string;
    disconnected?: boolean;
}): ClientServerPair;
export declare const packagedSocketIOImplForTest: ClientServerPair;
