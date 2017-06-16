import { CachedResponse } from './CachedResponse';
type Response<T> = any;
export declare type Policy = {
    maxage: number | null;
};
/**
 * returns true if this response is cacheable (according to cache-control headers)
 */
export declare function isCacheable<T>(res: Response<T> | CachedResponse): boolean;
/**
 * if the response is cacheable, returns an object detailing the maxage of the cache
 * otherwise returns null
 */
export declare function cachePolicy<T>(res: Response<T> | CachedResponse): Policy | null;
