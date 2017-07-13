export declare type SortOrder<TRecord> = {
    [P in keyof TRecord]?: 1 | -1;
};
export default SortOrder;
