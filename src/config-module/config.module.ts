import { DynamicModule, Global, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigService } from "./config.service";

@Global()
@Module({})
export class ConfigModule {
  static setDatabase(name: string, interval?: number): DynamicModule {
    DefaultDB = name;
    DefaultInterval = interval || 20000;
    return {
      module: ConfigModule,
      imports: [HttpModule],
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}

export let DefaultDB = "";
export let DefaultInterval = 0;
