import Promise = require('promise');
export default class Bulk {
    private readonly _parent;
    constructor(parent: any);
    find(query: any): {
        upsert(): any;
        remove(): any;
        removeOne(): any;
        update(updateObj: any): any;
        updateOne(updateObj: any): any;
        replaceOne(updObj: any): any;
    };
    insert(doc: any): void;
    tojson(): Object;
    toString(): Object;
    execute(): Promise<any>;
}
