/// <reference types="node" />
import Promise = require('promise');
import Response = require('../http-response-object-2');
export declare class ResponsePromise extends Promise<Response<Buffer | string>> {
    getBody(encoding: string): Promise<string>;
    getBody(): Promise<Buffer | string>;
}
declare function toResponsePromise(result: Promise<Response<Buffer | string>>): ResponsePromise;
export default toResponsePromise;
