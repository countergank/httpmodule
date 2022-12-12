import { INestApplication } from "@nestjs/common";
export declare const getToken: () => string;
export interface TestEndpoint {
    name: string;
    function: (done: any) => void;
}
export type FunctionTestApp = () => INestApplication;
export declare const basicget: (onApp: FunctionTestApp, done1: any, url: string, _body?: any) => void;
export declare const basicpost: (onApp: FunctionTestApp, done2: any, url: string, body?: any) => void;
export declare const basicput: (onApp: FunctionTestApp, done3: any, url: string, body?: any) => void;
export declare const basicdelete: (onApp: FunctionTestApp, done4: any, url: string, body?: any) => void;
