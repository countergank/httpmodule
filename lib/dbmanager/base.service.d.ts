import { HttpService } from "@nestjs/axios";
import { BulkItem, BulkWriteResult } from "./base.model";
import { AggregateCondition, BaseConfig, FlexService } from "./flex.service";
export declare class BaseService<T> extends FlexService {
    protected model: BaseConfig;
    protected httpService: HttpService;
    constructor(model: BaseConfig, httpService: HttpService);
    configValue(name: string): Promise<any>;
    max(fieldName: string): Promise<string | undefined>;
    count(filter: any): Promise<number>;
    findAll(filter: any): Promise<T[]>;
    aggregate(conditions: AggregateCondition): Promise<T[]>;
    findOne(filter: any): Promise<T | undefined>;
    findById(id: string): Promise<T | undefined>;
    create(item: T): Promise<T | undefined>;
    createMany(items: T[]): Promise<T[] | undefined>;
    bulk(items: Array<BulkItem<T>>): Promise<BulkWriteResult | undefined>;
    delete(id: string): Promise<T | undefined>;
    deleteMany(condition: any): Promise<T | undefined>;
    update(id: string, item: Partial<T>): Promise<T | undefined>;
    updateMany(item: Partial<T>, condition: any): Promise<T[]>;
}
export default BaseService;
