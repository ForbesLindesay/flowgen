/// <reference types="node" />
import { Headers } from '../http-basic/Headers';
import { ICache } from '../http-basic/ICache';
import Response = require('../http-response-object-2');
import { CachedResponse } from '../http-basic/CachedResponse';
interface Options {
    allowRedirectHeaders?: string[];
    cache?: 'file' | 'memory' | ICache;
    followRedirects?: boolean;
    gzip?: boolean;
    headers?: Headers;
    maxRedirects?: number;
    maxRetries?: number;
    retry?: boolean | ((err: NodeJS.ErrnoException | null, res: Response<NodeJS.ReadableStream | Buffer | string> | void, attemptNumber: number) => boolean);
    retryDelay?: number | ((err: NodeJS.ErrnoException | null, res: Response<NodeJS.ReadableStream | Buffer | string> | void, attemptNumber: number) => number);
    socketTimeout?: number;
    timeout?: number;
    isMatch?: (requestHeaders: Headers, cachedResponse: CachedResponse, defaultValue: boolean) => boolean;
    isExpired?: (cachedResponse: CachedResponse, defaultValue: boolean) => boolean;
    canCache?: (res: Response<NodeJS.ReadableStream>, defaultValue: boolean) => boolean;
    qs?: {
        [key: string]: any;
    };
    json?: any;
    body?: string | Buffer;
}
export { Options };
