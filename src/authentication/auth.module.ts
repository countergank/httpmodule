import { DynamicModule, Module, Global } from "@nestjs/common";
import { HttpErrorFilter } from "./services/http-error.filter";
import { JwtService } from "./services/jwt.service";

@Global()
@Module({})
export class AuthModule {
  static setKey(fieldName: string): DynamicModule {
    key = fieldName;
    return {
      module: AuthModule,
      providers: [HttpErrorFilter, JwtService],
      exports: [HttpErrorFilter],
    };
  }
}

export let key = "";
