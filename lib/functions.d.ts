export declare function toArray<T>(array?: T[] | void): T[];
export declare class ArrayList {
    private _excluded;
    private _items;
    constructor(_excluded?: string);
    concat(value: ArrayList): string[];
    push(value?: string): void;
    get(): string[];
    count(): number;
}
export interface ArrayComplexItem {
    id: string;
    items: string[];
}
export declare class ArrayComplexList {
    private _items;
    constructor(_items?: ArrayComplexItem[]);
    push(value: string, item: string): void;
    get(): ArrayComplexItem[];
    getItems(id: string): string[];
    count(): number;
    countItems(id: string): number;
}
export declare const formatDate: (fecha?: Date, days?: number, utc?: boolean, separator?: "-" | "/") => string;
export declare const replaceAll: (text: string, older: string[], newer: string[]) => string;
export declare const padLeadingZeros: (num?: string, size?: number) => string;
export declare const parseNumber: (value: any, def?: number) => number;
export declare const emailIsValid: (value: string) => boolean;
export declare const getValue: (item: any, names: string[], def?: string) => string;
export declare const completeText: (value: number, size?: number) => string;
export declare const arraySorted: (array: any[], fieldName: string, desc?: boolean) => any[];
export declare const errorFn: (_error: any) => void;
export declare const toString: (value: any, def?: string) => string;
export declare const testIsRunning: () => boolean;
