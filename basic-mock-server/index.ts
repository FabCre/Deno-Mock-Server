import { serve, Server } from "https://deno.land/std/http/server.ts";

import { Configuration } from "./index.d.ts";
import Options = Configuration.Options;
import Routes = Configuration.Routes;

const COLOR_RED = "\x1b[31m";
const COLOR_GREEN = "\x1b[32m";
const COLOR_PURPLE = "\x1b[1;35m";
const COLOR_YELLOW = "\x1b[33m";
const COLOR_WHITE = "\x1b[37m";

export const HELLO_DENO = `<!DOCTYPE html><html lang="en"><body><p>Hello, the basic deno &#x1F995; server is up and running !</p></body></html>`

const DEFAULT_CONFIG_OPTIONS: Options = {
    serverOptions: {
        hostname: "127.0.0.1",
        port: 8080
    },
    appName: "Deno Json Mock Server",
    routes: [{
        path: "index",
        response: HELLO_DENO
    }]
};

const requestHandler = async (server: Server, routes: Routes[]): Promise<void> => {
        for await (const request of server) {
            const routeDefinition = routes.find(route => request.url.startsWith(route.path, 1));

            if (routeDefinition === undefined) {
                console.log(COLOR_YELLOW, request.url, "404", COLOR_WHITE);
                request.respond({status: 404, body: JSON.stringify("Not found")});
            }

            if (typeof routeDefinition?.response === "string") {
                console.log(COLOR_GREEN, request.url, "200", COLOR_WHITE);
                request.respond({status: 200, body: routeDefinition?.response});
            } else if (typeof routeDefinition?.response === 'function') {
                console.log(COLOR_GREEN, request.url, "200", COLOR_WHITE);
                request.respond({ status: 200, body: routeDefinition.response(request)})
            }
    }
}

export const buildJsonMockServer = (config: Options): void => {
    const serverConfig = {
        ...DEFAULT_CONFIG_OPTIONS,
        ...config,
        routes: [
            ...DEFAULT_CONFIG_OPTIONS.routes,
            ...config.routes
        ]
    }
    const server: Server = serve(serverConfig.serverOptions);
    console.log(COLOR_PURPLE, `Deno HTTP webserver running. Access it at: http://${serverConfig.serverOptions.hostname}:${serverConfig.serverOptions.port}/`);
    requestHandler(server, serverConfig.routes).catch(error => console.error(COLOR_RED, error));
}

