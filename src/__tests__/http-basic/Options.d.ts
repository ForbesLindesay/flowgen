/// <reference types="node" />
import { Agent } from 'http';
import { Headers } from './Headers';
import { ICache } from './ICache';
import { CachedResponse } from './CachedResponse';
type Response<T> = any;
interface Options {
    agent?: Agent | boolean;
    allowRedirectHeaders?: string[];
    cache?: 'file' | 'memory' | ICache;
    followRedirects?: boolean;
    gzip?: boolean;
    headers?: Headers;
    ignoreFailedInvalidation?: boolean;
    maxRedirects?: number;
    maxRetries?: number;
    retry?: boolean;
    retryDelay?: number | ((err: NodeJS.ErrnoException | null, res: Response<NodeJS.ReadableStream> | void, attemptNumber: number) => number);
    socketTimeout?: number;
    timeout?: number;
    isMatch?: (requestHeaders: Headers, cachedResponse: CachedResponse, defaultValue: boolean) => boolean;
    isExpired?: (cachedResponse: CachedResponse, defaultValue: boolean) => boolean;
    canCache?: (res: Response<NodeJS.ReadableStream>, defaultValue: boolean) => boolean;
}
export { Options };
