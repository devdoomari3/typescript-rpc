# Typescript-RPC (FrontEnd JS <-> BackEnd nodeJS)

## Basic concepts:
 1. define API

    ```typescript
    export type EchoRequest = ToRequestType<{
      echoReq: string;
    }>;

    export type EchoResponse = ToResponseType<{
      echoResp: string;
    }>;

    export const echoAPI = createAPIDefinition<
      EchoRequest,
      EchoResponse
    >()('echo');
    ```

 1. (server - ONCE) create Server implementation instance

    ```typescript
    const apiServer = new SocketIOSimpleAPIServer(serverSocketIO);
    ```

 1. (server) add API Handler

    ```typescript
    apiServer.addAPI(echoAPI, async req => {
      return {
        echoResp: req.echoReq,
      };
    });
    ```

 1. (client - ONCE) create Client implementation instance

    ```typescript
    const apiClient = new SocketIOSimpleAPIClient();
    ```
 1. (client) get API stub function

    ```typescript
    const echo = apiClient.useAPI(echoAPI)
    ```

 1. (client) use API stub function

    ```typescript
    const echoResponse = await echo({
      echoReq: 'test',
    })
    ```

## API types:

 - simple-API: Simple request/response

 - with-progress API:
   + file uploads, etc

 - subscription-API:
   + real-time notifications, etc