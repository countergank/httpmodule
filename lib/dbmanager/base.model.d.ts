export declare class BaseModel {
    id?: string;
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
    numberid?: string;
}
export interface DbDefaultParams extends BaseModel {
    [value: string]: any;
}
export interface BulkInsertOne<T> {
    type: "insertOne";
    document: Partial<T>;
}
export interface BulkUpdateOne<T> {
    type: "updateOne";
    filter: DbDefaultParams;
    update: DbDefaultParams;
}
export interface BulkUpdateMany<T> {
    type: "updateMany";
    filter: DbDefaultParams;
    update: Partial<T>;
}
export interface BulkDeleteMany {
    type: "deleteMany";
    filter: DbDefaultParams;
}
export interface BulkDeleteOne {
    type: "deleteOne";
    filter: DbDefaultParams;
}
export interface BulkReplaceOne<T> {
    type: "replaceOne";
    filter: DbDefaultParams;
    replacement: Partial<T>;
}
export type BulkItem<T> = BulkInsertOne<T> | BulkUpdateOne<T> | BulkReplaceOne<T> | BulkDeleteOne | BulkDeleteMany | BulkUpdateMany<T>;
export interface BulkWriteResult {
    ok: boolean;
    writeErrors: any[];
    writeConcernErrors: any;
    insertedIds: any[];
    nInserted: number;
    nUpserted: number;
    nMatched: number;
    nModified: number;
    nRemoved: number;
    upserted: any[];
    opTime?: any;
}
