import {buildJsonMockServer, HELLO_DENO} from "../basic-mock-server/index.ts";

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
        // Json are not supported for now @see https://github.com/denoland/deno/issues/5633
        response: () => HELLO_DENO
    }]
});