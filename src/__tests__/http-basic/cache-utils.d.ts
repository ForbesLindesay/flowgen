import { Headers } from './Headers';
import { CachedResponse } from './CachedResponse';
import Response = require('../http-response-object-2');
export declare function isMatch(requestHeaders: Headers, cachedResponse: CachedResponse): boolean;
export declare function isExpired(cachedResponse: CachedResponse): boolean;
export declare function canCache<T>(res: Response<T>): boolean;
