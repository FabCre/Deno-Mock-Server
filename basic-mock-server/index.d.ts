import { HTTPOptions, ServerRequest } from "https://deno.land/std@0.78.0/http/server.ts";

export declare module Configuration {
    type ResponseFunction = (request: ServerRequest) => string;

    interface Routes {
        path: string;
        response: ResponseFunction | string;
    }

    interface Options {
        serverOptions: HTTPOptions;
        appName: string,
        routes: Routes[]
    }
}
