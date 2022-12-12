import { HttpService } from "@nestjs/axios";
import { FlexService } from "../dbmanager/flex.service";
export declare class ConfigService extends FlexService {
    httpService: HttpService;
    private items;
    constructor(httpService: HttpService);
    private run;
    get(name: string, def?: string): string | undefined;
}
