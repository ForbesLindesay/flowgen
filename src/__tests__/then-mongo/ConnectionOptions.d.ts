/// <reference types="node" />
import ReadPreference from './ReadPreference';
export default interface ConnectionOptions {
    /**
     * The maximum size of the individual server pool. (default: 5)
     */
    readonly poolSize?: number;
    /**
     * Enable SSL connection. (default: false)
     */
    readonly ssl?: boolean;
    readonly sslCA?: Buffer;
    readonly sslCRL?: Buffer;
    readonly sslCert?: Buffer;
    readonly sslKey?: Buffer;
    readonly sslPass?: string;
    /**
     * Enable autoReconnect for single server instances (default: true)
     */
    readonly autoReconnect?: boolean;
    /**
     * TCP Connection no delay (default: true)
     */
    readonly noDelay?: boolean;
    /**
     * Version of IP stack. Defaults to 4
     */
    readonly family?: number;
    /**
     * The number of milliseconds to wait before initiating keepAlive on the TCP socket. (default: 30000)
     */
    readonly keepAlive?: number;
    readonly connectTimeoutMS?: number;
    readonly socketTimeoutMS?: number;
    readonly reconnectTries?: number;
    readonly reconnectInterval?: number;
    readonly ha?: boolean;
    readonly haInterval?: number;
    readonly replicaSet?: string;
    readonly secondaryAcceptableLatencyMS?: number;
    readonly acceptableLatencyMS?: number;
    readonly connectWithNoPrimary?: boolean;
    readonly authSource?: string;
    readonly w?: number | string;
    readonly wtimeout?: number;
    readonly j?: boolean;
    readonly forceServerObjectId?: boolean;
    readonly serializeFunctions?: boolean;
    readonly ignoreUndefined?: boolean;
    readonly raw?: boolean;
    /**
     * Promotes Long values to number if they fit inside the 53 bits resolution. (default: true)
     */
    readonly promoteLongs?: boolean;
    /**
     * Promotes Binary BSON values to native Node Buffers. (default: false)
     */
    readonly promoteBuffers?: boolean;
    /**
     * Promotes BSON values to native types where possible, set to false to only receive wrapper types. (default: true)
     */
    readonly promoteValues?: boolean;
    /**
     * Sets a cap on how many operations the driver will buffer up before giving up on getting a working connection (default: unlimited)
     */
    readonly bufferMaxEntries?: number;
    readonly readPreference?: ReadPreference;
    readonly domainsEnabled?: boolean;
    readonly pkFactory?: Object;
    readonly readConcern?: Object;
    readonly maxStalenessSeconds?: number;
    /**
     * The name of the application that created this MongoClient instance. MongoDB 3.4 and newer will print this value in the server log
     * upon establishing each connection. It is also recorded in the slow query log and profile collections.
     */
    readonly appname?: string;
    readonly loggerLevel?: 'error' | 'warn' | 'info' | 'debug';
    readonly validateOptions?: Object;
}
