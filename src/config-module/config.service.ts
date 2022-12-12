import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigInfo, FlexService } from "../dbmanager/flex.service";
import { errorFn, parseNumber, testIsRunning } from "../functions";
import { DefaultDB, DefaultInterval } from "./config.module";

@Injectable()
export class ConfigService extends FlexService {
  private items: ConfigInfo[] = [];

  constructor(public httpService: HttpService) {
    super(ConfigService.name, httpService);

    if (!testIsRunning()) {
      this.run(0);
    }
  }

  private run(timeout: number) {
    setTimeout(() => {
      if (!DefaultDB) {
        this.run(20000);
        return;
      }
      this.config(DefaultDB)
        .then((resp) => {
          this.items.splice(0, this.items.length);
          this.items.push(...resp);
          this.run(DefaultInterval);
        })
        .catch(errorFn);
    }, timeout);
  }

  get(name: string, def?: string) {
    return this.items.find((i) => i.name === name)?.value || def;
  }
}
