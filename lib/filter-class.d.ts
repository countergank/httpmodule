type CacheParam = any;
export declare class FilterClass {
    private complex;
    isComplex(): boolean;
    private analizeComplexFilter;
    private applyFilterOr;
    apply(ffilter: CacheParam, item: CacheParam): boolean;
    private applyFilter;
}
export {};
