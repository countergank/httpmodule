import { HttpService } from "@nestjs/axios";
import { AxiosRequestConfig } from "axios";
import { BulkItem, BulkWriteResult } from "./base.model";
export interface BaseConfig {
    dbname: string;
    tablename: string;
}
export declare const defaultToken: () => string;
export declare class FlexService {
    protected name: string;
    protected httpService: HttpService;
    private logger;
    private url;
    private token;
    private timeout;
    private enableLog;
    protected _testing: boolean;
    parseNumber(value: any, def?: number): number;
    protected getMockFileName(tablename: string): string;
    protected getMockInfo(tablename: string): any[];
    maxInArray(items: any[], fieldName: string, isNumber?: boolean): string | number;
    protected getConfig(name: string): string;
    protected errorLog(name: string, data?: any, locale?: boolean): void;
    protected debugLog(name: string, data?: any, type?: "W" | "L" | "D", forcedLog?: boolean): void;
    constructor(name: string, httpService: HttpService);
    private request;
    private execute;
    httppost(url: string, body?: any, options?: AxiosRequestConfig): Promise<any>;
    httpget(url: string, options?: AxiosRequestConfig): Promise<any>;
    httpput(url: string, body?: any, options?: AxiosRequestConfig): Promise<any>;
    httpdelete(url: string, options?: AxiosRequestConfig): Promise<any>;
    maxFlex(model: BaseConfig, fieldName: string, mockItems?: any[]): Promise<string | undefined>;
    config(dbname: string): Promise<ConfigInfo[]>;
    aggregateFlex(model: BaseConfig, conditions: AggregateCondition, mockItems?: any[]): Promise<any[]>;
    findAllFlex(model: BaseConfig, filter: any, mockItems?: any[]): Promise<any[]>;
    protected filterForTest<T>(_mockItems: T[], _filter: any): T[];
    countFlex(model: BaseConfig, filter: any, mockItems?: any[]): Promise<number>;
    findOneFlex(model: BaseConfig, filter: any, mockItems?: any[]): Promise<any | undefined>;
    findByIdFlex(model: BaseConfig, id: string, mockItems?: any[]): Promise<any | undefined>;
    createFlex(model: BaseConfig, item: any, mockItems?: any[]): Promise<any | undefined>;
    createManyFlex(model: BaseConfig, items: any[], mockItems?: any[]): Promise<any | undefined>;
    bulkFlex(model: BaseConfig, items: Array<BulkItem<any>>, mockItems?: any[]): Promise<BulkWriteResult | undefined>;
    deleteFlex(model: BaseConfig, id: string, mockItems?: any[]): Promise<any | undefined>;
    deleteManyFlex(model: BaseConfig, condition: any, mockItems?: any[]): Promise<any | undefined>;
    updateFlex(model: BaseConfig, id: string, item: Partial<any>, mockItems?: any[]): Promise<any | undefined>;
    updateManyFlex(model: BaseConfig, item: Partial<any>, condition: any, mockItems?: any[]): Promise<any[]>;
}
export default FlexService;
export interface ConfigInfo {
    name: string;
    value: string;
}
export interface AggregateItem {
    [value: string]: any;
}
export interface AggregateSort {
    [value: string]: 1 | -1;
}
export interface AggregateFormat {
    fieldName: string;
    fieldType: "boolean" | "number" | "array" | "object" | "string" | "date";
}
export interface AggregateCondition {
    $match: AggregateItem;
    $project: AggregateItem;
    $group?: {
        _id: any;
        [key: string]: any;
    };
    $sort?: AggregateSort;
    $limit?: number;
    $format?: AggregateFormat[];
}
