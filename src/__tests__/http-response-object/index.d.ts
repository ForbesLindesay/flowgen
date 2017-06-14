/// <reference types="node" />
import { Headers } from './headers';
/**
 * A response from a web request
 */
declare class Response {
    readonly statusCode: number;
    readonly headers: Headers;
    readonly body: Buffer | string;
    readonly url: string;
    constructor(statusCode: number, headers: Headers, body: Buffer | string, url: string);
    getBody(encoding: string): string;
    getBody(): Buffer | string;
}
export = Response;
