/// <reference types="node" />
import {Readable as ReadableStream} from 'stream';
import Promise = require('promise');
import SortOrder from './SortOrder';

export default class Cursor<TRecord> extends ReadableStream {
  readonly [Symbol.toStringTag]: 'Promise';
  private readonly _parent;
  private _promise;
  constructor(parent: any);
  next(): Promise<TRecord | null>;
  rewind(): Promise<void>;
  toArray(): Promise<Array<TRecord>>;
  map<TResult>(mapfn: (record: TRecord) => TResult): Promise<Array<TResult>>;
  forEach(fn: (record: TRecord) => void): Promise<void>;
  count(): Promise<number>;
  size(): Promise<number>;
  explain(): Promise<Object>;
  destroy(): this;
  batchSize(size: number): this;
  hint(hint: string): this;
  limit(count: number): this;
  maxTimeMS(value: number): this;
  max(value: number): this;
  min(value: number): this;
  skip(count: number): this;
  snapshot(value: boolean): this;
  sort(obj: SortOrder<TRecord>): this;
  _read(): void;
  /**
   * Attaches callbacks for the resolution and/or rejection of the ThenPromise.
   * @param onfulfilled The callback to execute when the ThenPromise is resolved.
   * @param onrejected The callback to execute when the ThenPromise is rejected.
   * @returns A ThenPromise for the completion of which ever callback is executed.
   */
  then<TResult1 = Array<TRecord>, TResult2 = never>(
    onfulfilled?:
      | ((value: Array<TRecord>) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null,
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the ThenPromise.
   * @param onrejected The callback to execute when the ThenPromise is rejected.
   * @returns A ThenPromise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | PromiseLike<TResult>)
      | undefined
      | null,
  ): Promise<Array<TRecord> | TResult>;
  /**
   * Attaches callbacks for the resolution and/or rejection of the ThenPromise, without returning a new promise.
   * @param onfulfilled The callback to execute when the ThenPromise is resolved.
   * @param onrejected The callback to execute when the ThenPromise is rejected.
   */
  done(
    onfulfilled?: ((value: Array<TRecord>) => any) | undefined | null,
    onrejected?: ((reason: any) => any) | undefined | null,
  ): void;
  /**
   * Calls a node.js style callback.  If none is provided, the promise is returned.
   */
  nodeify(callback: void | null): Promise<Array<TRecord>>;
  nodeify(callback: (err: Error, value: Array<TRecord>) => void): void;
}
