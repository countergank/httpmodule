import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import * as config from "config";
import { AxiosRequestConfig, AxiosResponse } from "axios";

@Injectable()
export class HTTPService {
  private logger = new Logger(HTTPService.name);
  private timeout: number;

  public parseNumber(value: any, def: number = 0): number {
    try {
      const i = parseFloat(value);
      if (!i || isNaN(i)) {
        return def;
      }
      return i;
    } catch (error) {
      return def;
    }
  }

  protected getConfig(name: string): string {
    try {
      return process.env[name] || config.get(name);
    } catch (error) {
      return "";
    }
  }

  protected errorLog(name: string, data?: any) {
    if (!this.logger) {
      return;
    }

    try {
      const first = data ? JSON.stringify(data) : undefined;
      const second = JSON.stringify(name);

      if (first) {
        this.logger.error(first, second);
      } else {
        this.logger.error(second);
      }
    } catch (error) {
      return;
    }
  }

  protected debugLog(name: string, data?: any, type: "W" | "L" | "D" = "L") {
    if (!this.logger) {
      return;
    }

    try {
      const first = data ? JSON.stringify(data) : undefined;
      const second = JSON.stringify(name);

      if (first) {
        switch (type) {
          case "W":
            this.logger.warn(first, second);
            break;

          case "D":
            this.logger.debug(first, second);
            break;

          default:
            this.logger.log(first, second);
            break;
        }
      } else {
        switch (type) {
          case "W":
            this.logger.warn(second);
            break;

          case "D":
            this.logger.debug(second);
            break;

          default:
            this.logger.log(second);
            break;
        }
      }
    } catch (error) {
      return;
    }
  }

  constructor(protected httpService: HttpService) {
    this.timeout = this.parseNumber(this.getConfig("HTTPTIMEOUT"), 20000);
  }

  private async request(
    url: string,
    method: "GET" | "POST" | "DELETE" | "PUT" = "GET",
    options?: AxiosRequestConfig,
    body?: any
  ): Promise<AxiosResponse<any>> {
    return new Promise(async (resolve, reject) => {
      if (url === "") {
        return reject({ message: "URL invalida" });
      }

      if (!options) {
        options = {
          headers: {
            "Content-Type": "application/json",
          },
        };
      }

      if (options.headers && !options.headers["Content-Type"]) {
        options.headers["Content-Type"] = "application/json";
      }

      if (!options.timeout) {
        options.timeout = this.timeout;
      }

      let resp = null;
      const query = `${url}.${body ? "Body: " + JSON.stringify(body) : ""}`;
      switch (method) {
        case "GET":
          resp = this.httpService.get(url, options).toPromise();
          break;
        case "POST":
          resp = this.httpService.post(url, body, options).toPromise();
          break;
        case "PUT":
          resp = this.httpService.put(url, body, options).toPromise();
          break;
        default:
          resp = this.httpService.delete(url, options).toPromise();
          break;
      }

      if (!resp) {
        this.errorLog("request", {
          message: `No se pudo ejecutar la consulta ${query}`,
        });
        return reject({ message: "Invalid Request" });
      }

      resp
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          resolve(error);
        });
    });
  }

  async get(url: string, options?: AxiosRequestConfig) {
    return this.request(url, "GET", options);
  }
  async post(url: string, body?: any, options?: AxiosRequestConfig) {
    return this.request(url, "POST", options, body);
  }
  async put(url: string, body?: any, options?: AxiosRequestConfig) {
    return this.request(url, "PUT", options, body);
  }
  async delete(url: string, options?: AxiosRequestConfig) {
    return this.request(url, "DELETE", options);
  }
}
