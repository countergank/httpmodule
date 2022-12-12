import { HttpService } from "@nestjs/axios";
import { BulkItem, BulkWriteResult } from "./base.model";
import { AggregateCondition, BaseConfig, FlexService } from "./flex.service";
export declare class BaseFullService<T> extends FlexService {
    protected model: BaseConfig;
    protected httpService: HttpService;
    private mockArray;
    private _mockItems;
    constructor(model: BaseConfig, httpService: HttpService, mockArray?: T[]);
    configValue(name: string): Promise<any>;
    generateMock(fileName?: string): Promise<T[] | undefined>;
    private cacheEnabled;
    private cacheItems;
    runCache(timeout?: number): void;
    max(fieldName: string): Promise<string | undefined>;
    count(filter: any): Promise<number>;
    findAll(filter: any): Promise<T[]>;
    aggregate(conditions: AggregateCondition): Promise<T[]>;
    findOne(filter: any): Promise<T | undefined>;
    findById(id: string): Promise<T | undefined>;
    create(item: T): Promise<T | undefined>;
    createMany(items: T[]): Promise<T[] | undefined>;
    bulk(items: Array<BulkItem<T>>): Promise<BulkWriteResult | undefined>;
    delete(id: string): Promise<boolean>;
    deleteMany(condition: any): Promise<boolean>;
    update(id: string, item: Partial<T>): Promise<T | undefined>;
    updateMany(item: Partial<T>, condition: any): Promise<T[]>;
}
export default BaseFullService;
