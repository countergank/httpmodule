import { HttpService } from "@nestjs/axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";
export declare class HTTPService {
    protected httpService: HttpService;
    private logger;
    private timeout;
    parseNumber(value: any, def?: number): number;
    protected getConfig(name: string): string;
    protected errorLog(name: string, data?: any): void;
    protected debugLog(name: string, data?: any, type?: "W" | "L" | "D"): void;
    constructor(httpService: HttpService);
    private request;
    get(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<any, any>>;
    post(url: string, body?: any, options?: AxiosRequestConfig): Promise<AxiosResponse<any, any>>;
    put(url: string, body?: any, options?: AxiosRequestConfig): Promise<AxiosResponse<any, any>>;
    delete(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<any, any>>;
}
