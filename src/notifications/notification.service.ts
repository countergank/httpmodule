import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import * as config from "config";
import { AxiosRequestConfig } from "axios";
import {
  BodyQueue,
  BodyRequestNotification,
  BodyRequestNotificationHTML,
} from "./notification.interfaces";
import { bodyIsOk, bodyQueueIsOk } from "./notification.functions";
import { defaultToken } from "../dbmanager/flex.service";

@Injectable()
export class NotificationService {
  private logger = new Logger(NotificationService.name);
  private url: string;
  private token: string = defaultToken();
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
    this.url = this.getConfig("NOTIFICATIONURL");
    const token = this.getConfig("DBTOKEN");
    if (token && token !== "") {
      this.token = token;
    }
    this.timeout = this.parseNumber(
      this.getConfig("NOTIFICATIONTIMEOUT"),
      20000
    );
    if (!this.url || this.url.length < 5) {
      this.errorLog(
        "NotificationModule",
        "No esta configurada la URL de conexion a la API de Notificaciones. Env: [NOTIFICATIONURL]"
      );
      return;
    }
    this.url = this.url + "/notification";
    if (!this.token || this.token.length < 5) {
      this.errorLog(
        "NotificationModule",
        "No esta configurado el token de acceso a " + this.url
      );
    }
  }

  private async request(
    endpoint: string,
    method: "GET" | "POST" | "DELETE" | "PUT" = "GET",
    body?: any
  ) {
    return new Promise<any>(async (resolve) => {
      const url = this.url && this.url.length > 5 ? this.url + endpoint : "";
      if (url === "") {
        return resolve(undefined);
      }

      const token = this.token && this.token.length > 5 ? this.token : "";
      if (token === "") {
        this.errorLog(
          "request." + url,
          "No esta configurado el token de acceso"
        );
        return resolve(undefined);
      }

      const options: AxiosRequestConfig = {
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${token}`,
        },
        timeout: this.timeout,
      };

      let resp = null;
      const query = `${this.url}.${
        body ? "Body: " + JSON.stringify(body) : ""
      }`;
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
        return resolve(undefined);
      }

      resp
        .then((response) => {
          if (response && (response?.data || response?.status < 300)) {
            return resolve(response.data);
          }
          this.errorLog("request", {
            message: `La consulta ${query} no devolvio informacion`,
          });
          return resolve(undefined);
        })
        .catch((error) => {
          this.errorLog("request." + query, error);
          return resolve(undefined);
        });
    });
  }

  async send(body: BodyRequestNotification): Promise<{ message: any }> {
    if (!bodyIsOk(body)) {
      return { message: "Invalid Body Request" };
    }

    let message: any = null;
    const resp = await this.request("/send", "POST", body).catch(
      (error) => (message = error)
    );
    if (message) {
      return { message };
    }
    return { message: null };
  }

  async insertQueue(body: BodyQueue): Promise<{ message: any }> {
    if (!bodyQueueIsOk(body)) {
      return {
        message: "Invalid Request",
      };
    }
    let message: any = null;
    const resp = await this.request("/queue", "POST", body).catch(
      (error) => (message = error)
    );
    if (message) {
      return { message };
    }
    return { message: null };
  }

  async getHTML(body: BodyRequestNotificationHTML): Promise<string> {
    return new Promise(async (resolve, reject) => {
      if (!body?.key || !Array.isArray(body?.info) || body.info.length === 0) {
        return reject({ message: "Invalid Body Request" });
      }

      let message: any = null;

      const resp = await this.request("/html-get", "POST", body).catch(
        (error) => (message = error)
      );

      if (message || !resp) {
        return reject({ message: message || "No se pudo generar el html" });
      }

      return resolve(resp);
    });
  }
}
