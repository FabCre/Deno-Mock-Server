# Deno-Mock-Server

## How it works

- Simple `index.ts` which exports a function called `buildJsonMockServer`
- Use this function to build easily a json mock server
- Let us create a simple mock server with js object as response or with a function that create a js object
- Pure Deno, no dependencies needed
- Log every request with status code (200, 404) with color

## Example

``` Typescript
// File example-web-api.ts
import { buildJsonMockServer, HELLO_DENO } from "../basic-mock-server/index.ts";

buildJsonMockServer({
    serverOptions: {
        hostname: "127.0.0.1",
        port: 8080
    },
    appName: 'Example web api',
    routes: [{
        path: "users",
        // Json are not supported for now @see https://github.com/denoland/deno/issues/5633
        response: Deno.readTextFileSync('./users.json')
    }, {
        path: "deno",
        response: () => HELLO_DENO
    }]
});
```

``` deno
// Just run the script
deno run --allow-net --allow-read example-web-api.ts
```