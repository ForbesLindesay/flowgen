export declare type NumberUpdate<TRecord> = {
    [P in keyof TRecord]?: number & TRecord[P];
};
export declare type Update<TRecord> = {
    /**
     * The $inc operator increments a field by a specified value.
     */
    $inc?: NumberUpdate<TRecord>;
    /**
     * Multiply the value of a field by a number.
     */
    $mul?: NumberUpdate<TRecord>;
    /**
     * The $rename operator updates the name of a field.
     */
    $rename?: {
        [P in keyof TRecord]?: keyof TRecord;
    };
    /**
     * If an update operation with upsert: true results in an insert of a document,
     * then $setOnInsert assigns the specified values to the fields in the document.
     * If the update operation does not result in an insert, $setOnInsert does nothing.
     */
    $setOnInsert?: Partial<TRecord>;
    /**
     * The $set operator replaces the value of a field with the specified value.
     */
    $set?: Partial<TRecord>;
    /**
     * The $unset operator deletes a particular field. Consider the following syntax:
     */
    $unset?: {
        [P in keyof TRecord]?: 1;
    };
    /**
     * The $min updates the value of the field to a specified value if the specified value
     * is less than the current value of the field.
     */
    $min?: NumberUpdate<TRecord>;
    /**
     * The $max operator updates the value of the field to a specified value if the specified
     * value is greater than the current value of the field.
     */
    $max?: NumberUpdate<TRecord>;
    /**
     * The $currentDate operator sets the value of a field to the current date, either as a Date
     * or a timestamp. The default type is Date.
     */
    $currentDate?: {
        [P in keyof TRecord]?: {
            $type: 'timestamp';
        } | true;
    };
};
export default Update;
