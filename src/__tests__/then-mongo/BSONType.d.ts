declare const enum BSONType {
    Double = 1,
    String = 2,
    Object = 3,
    Array = 4,
    BinaryData = 5,
    ObjectID = 7,
    Boolean = 8,
    Date = 9,
    Null = 10,
    RegularExpression = 11,
    JavaScript = 14,
    JavaSCriptWithScope = 15,
    /**
     * 32-bit integer
     */
    Integer = 16,
    Timestamp = 17,
    /**
     * 64-bit integer
     */
    Long = 18,
    Decimal = 19,
    MinKey = -1,
    MaxKey = 127,
}
export default BSONType;
