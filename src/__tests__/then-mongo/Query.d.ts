import BSONType from './BSONType';
export declare type QuerySelector<TValue> = {
    $eq?: TValue;
    $gt?: TValue;
    $gte?: TValue;
    $lt?: TValue;
    $lte?: TValue;
    $ne?: TValue;
    $in?: Array<TValue>;
    $nin?: Array<TValue>;
    $exists?: boolean;
    $type?: BSONType | 'number';
    /**
     * { field: { $mod: [ divisor, remainder ] } }
     */
    $mod?: [number, number];
    $regex?: RegExp;
    $text?: {
        $search: string;
        $language?: string;
        $caseSensitive?: boolean;
        $diacriticSensitive?: boolean;
    };
    /**
     * https://docs.mongodb.com/manual/reference/operator/query/where/#op._S_where
     */
    $where?: string | Function;
    $geoWithin?: any;
    $geoIntersects?: any;
    $near?: any;
    $nearSphere?: any;
    /**
     * The $all operator selects the documents where the value of a field is an array
     * that contains all the specified elements:
     *
     * { <field>: { $all: [ <value1> , <value2> ... ] } }
     */
    $all?: TValue & Array<any>;
    $elemMatch?: QuerySelector<any>;
    $size?: number;
    $bitsAllSet: any;
    $bitsAnySet: any;
    $bitsAllClear: any;
    $bitsAnyClear: any;
};
export declare type Query<TRecord> = {
    [P in keyof TRecord]?: TRecord[P] | QuerySelector<TRecord[P]>;
} | {
    $or: Array<Query<TRecord>>;
} | {
    $and: Array<Query<TRecord>>;
} | {
    $not: Query<TRecord>;
} | {
    $nor: Array<Query<TRecord>>;
};
export default Query;
