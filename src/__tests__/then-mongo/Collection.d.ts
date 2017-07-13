import Promise = require('promise');
import Bulk from './Bulk';
import Cursor from './Cursor';
import IndexOptions from './IndexOptions';
import Query from './Query';
import SortOrder from './SortOrder';
import Update from './Update';
import UpdateOptions from './UpdateOptions';
export default class Collection<TRecord> {
    private readonly _parent;
    constructor(parent: any);
    find(query?: Query<TRecord>): Cursor<TRecord>;
    find<TKey extends keyof TRecord>(query: Query<TRecord>, projection?: Record<TKey, 1>): Cursor<Pick<TRecord, TKey>>;
    findOne(query: Query<TRecord>): Promise<null | TRecord>;
    findOne<TKey extends keyof TRecord>(query: Query<TRecord>, projection: Record<TKey, 1>): Promise<null | Pick<TRecord, TKey>>;
    findAndModify(opts: {
        query: Query<TRecord>;
        sort?: SortOrder<TRecord>;
        doc: Update<TRecord>;
    }): Promise<any>;
    count(query?: Query<TRecord>): Promise<number>;
    distinct<TKey extends keyof TRecord>(field: TKey, query?: Query<TRecord>): Promise<Array<TRecord[TKey]>>;
    insert(docOrDocs: TRecord | Array<TRecord>, opts?: Object): Promise<Array<Object> | Object>;
    update(query: Query<TRecord>, update: Update<TRecord>, opts?: UpdateOptions): Promise<Object>;
    save(doc: Object, opts?: Object): Promise<Object>;
    remove(query: Query<TRecord>, opts?: {
        justOne: boolean;
    }): Promise<Object>;
    /**
     * Rename the collection
     */
    rename(name: string, opts?: {
        dropTarget: boolean;
    }): Promise<void>;
    drop(): Promise<void>;
    stats(): Promise<any>;
    mapReduce(map: any, reduce: any, opts?: Object): Promise<any>;
    runCommand(cmd: string, opts?: Object): Promise<any>;
    toString(): string;
    dropIndexes(): Promise<void>;
    dropIndex(indexName: string): Promise<void>;
    createIndex(index: keyof TRecord | {
        [P in keyof TRecord]?: 1 | -1;
    }, opts?: IndexOptions): Promise<void>;
    ensureIndex(index: keyof TRecord | {
        [P in keyof TRecord]?: 1 | -1;
    }, opts?: IndexOptions): Promise<void>;
    getIndexes(): Promise<Array<Object>>;
    reIndex(): Promise<void>;
    isCapped(): Promise<boolean>;
    group(doc: any): Promise<Array<any>>;
    aggregate(...pipeline: Array<any>): Cursor<any>;
    initializeOrderedBulkOp(): Bulk;
    initializeUnorderedBulkOp(): Bulk;
}
