export default interface UpdateOptions {
    /**
     * The write concern
     */
    readonly w?: number | string;
    /**
     * The write concern timeout
     */
    readonly wtimeout?: number;
    /**
     * Specify a journal write concern
     */
    readonly j?: boolean;
    /**
     * Insert the document if it does not already exist (default: false)
     */
    readonly upsert?: boolean;
    /**
     * Update more than one document with the same operation (default: false)
     */
    readonly multi?: boolean;
    /**
     * Allow driver to bypass schema validation in MongoDB 3.2 or higher (default: false)
     */
    readonly bypassDocumentValidation?: boolean;
    /**
     * Specify collation (MongoDB 3.4 or higher) settings for update operation.
     */
    readonly collation?: Object;
}
