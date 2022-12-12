import { DynamicModule } from "@nestjs/common";
export declare class ConfigModule {
    static setDatabase(name: string, interval?: number): DynamicModule;
}
export declare let DefaultDB: string;
export declare let DefaultInterval: number;
