import { JwtPayload } from "./authentication/services/model/jwt.model";
import { Response } from "express";
import { PathsObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
export interface TestInfoPath {
    name: string;
    method: string;
    url: string;
    variables: string;
    body: string;
}
export interface HttpRequest {
    [value: string]: any;
    user: JwtPayload;
}
export interface HttpResponse extends Response {
    others?: string;
}
export declare abstract class MainModule {
    static host: string;
    static port: number;
    static isDev: boolean;
    static URL: string;
    constructor();
    private static normalizePort;
}
export interface AppConfig {
    excludeTestFeatures?: boolean;
    excludeBearerToken?: boolean;
    debug?: boolean;
}
declare function create(appModule: MainModule, appPath: string, config?: AppConfig): Promise<void>;
export declare const addfeatures: (paths: PathsObject, testingPath?: string, debug?: boolean) => void;
export default create;
