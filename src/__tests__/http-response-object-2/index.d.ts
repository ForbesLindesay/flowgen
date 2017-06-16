import { Headers } from './headers';
/**
 * A response from a web request
 */
declare class Response<TBody> {
    readonly statusCode: number;
    readonly headers: Headers;
    readonly body: TBody;
    readonly url: string;
    constructor(statusCode: number, headers: Headers, body: TBody, url: string);
    getBody(encoding: string): string;
    getBody(): TBody;
}
export = Response;
