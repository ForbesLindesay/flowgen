import BSONType from './BSONType';
import Bulk from './Bulk';
import Collection from './Collection';
import ConnectionOptions from './ConnectionOptions';
import Cursor from './Cursor';
import Database from './Database';
import IndexOptions from './IndexOptions';
import Query from './Query';
import ReadPreference from './ReadPreference';
import SortOrder from './SortOrder';
import Update from './Update';
import UpdateOptions from './UpdateOptions';
export declare type DatabaseProxy<CollectionName extends string> = {
    [P in CollectionName]: Collection<any>;
};
declare function connect(connectionString: string, options?: ConnectionOptions): Database;
declare function connect<CollectionName extends string>(connectionString: string, collections: Array<string>, options?: ConnectionOptions): Database & DatabaseProxy<CollectionName>;
export default connect;
export { BSONType, Bulk, Collection, ConnectionOptions, Cursor, Database, IndexOptions, Query, ReadPreference, SortOrder, Update, UpdateOptions };
