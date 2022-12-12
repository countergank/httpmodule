import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { getToken } from "../testing";
import { configurationGet } from "../configuration.service";
import { BulkItem, BulkWriteResult } from "./base.model";
import {
  arraySorted,
  formatDate,
  parseNumber as pnumber,
  testIsRunning,
  toArray,
  toString,
} from "../functions";
import { FilterClass } from "../filter-class";
import path = require("path");
import { existsSync, mkdirSync, readFileSync } from "fs";

export interface BaseConfig {
  dbname: string;
  tablename: string;
}

export const defaultToken = (): string => {
  return getToken();
};

@Injectable()
export class FlexService {
  private logger: Logger;
  private url: string;
  private token: string = defaultToken();
  private timeout: number;
  private enableLog: boolean;
  protected _testing: boolean = false;

  public parseNumber(value: any, def: number = 0): number {
    return pnumber(value, def);
  }

  protected getMockFileName(tablename: string) {
    const dir = path.join(__dirname, "../../../../../resources/mocks");
    if (!existsSync(dir)) {
      mkdirSync(dir);
    }
    return path.join(dir, "/" + tablename + ".json");
  }

  protected getMockInfo(tablename: string): any[] {
    const fileName = this.getMockFileName(tablename);
    if (existsSync(fileName)) {
      try {
        const content = JSON.parse(readFileSync(fileName, "utf-8"));
        if (Array.isArray(content)) {
          return content.map((item, index) => {
            if (!item.id) {
              item.id = item._id || (index + 1).toString();
            }
            return item;
          });
        }
      } catch (error) {
        errorFn(null);
      }
    }
    return [];
  }

  maxInArray(items: any[], fieldName: string, isNumber?: boolean) {
    if (isNumber) {
      let max = 0;
      items.forEach((item) => {
        max = Math.max(max, pnumber(item[fieldName]));
      });
      return max;
    } else {
      let smax = "";
      items.forEach((item) => {
        if (toString(item[fieldName]) > smax) {
          smax = toString(item[fieldName]);
        }
      });
      return smax;
    }
  }

  protected getConfig(name: string): string {
    return configurationGet(name);
  }

  protected errorLog(name: string, data?: any, locale?: boolean) {
    if (!this.logger || (!this.enableLog && locale)) {
      return;
    }

    try {
      const first = data ? JSON.stringify(data) : undefined;
      const second = JSON.stringify(name);

      if (first) {
        this.logger.error({ data: first, name: second });
      } else {
        this.logger.error(second);
      }
    } catch (error) {
      return;
    }
  }

  protected debugLog(
    name: string,
    data?: any,
    type: "W" | "L" | "D" = "L",
    forcedLog?: boolean
  ) {
    if (!this.logger || (!this.enableLog && !forcedLog)) {
      return;
    }

    try {
      const first = data ? JSON.stringify(data) : undefined;
      const second = JSON.stringify(name);

      if (first) {
        switch (type) {
          case "W":
            this.logger.warn({ data: first, name: second });
            break;

          case "D":
            this.logger.debug({ data: first, name: second });
            break;

          default:
            this.logger.log({ data: first, name: second });
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

  constructor(protected name: string, protected httpService: HttpService) {
    this.logger = new Logger(name);
    this.url = this.getConfig("DBURL");
    this.enableLog =
      ["1", "t", "true"].indexOf(this.getConfig("DBURL_LOG").toLowerCase()) >=
      0;
    const token = this.getConfig("DBTOKEN");
    if (token && token !== "") {
      this.token = token;
    }
    this.timeout = this.parseNumber(this.getConfig("DBTIMEOUT"), 20000);
    if (!this.url || this.url.length < 5) {
      this.errorLog(
        "DBModule",
        "No esta configurada la URL de conexion a la DB. Env: [DBURL]"
      );
    }
    if (!this.token || this.token.length < 5) {
      this.errorLog(
        "DBModule",
        "No esta configurado el token de acceso a " + this.url
      );
    }
    this._testing = testIsRunning();
  }

  private async request(
    model: BaseConfig,
    endpoint: string,
    method: "GET" | "POST" | "DELETE" | "PUT" = "GET",
    body?: any,
    def?: any
  ) {
    try {
      if (!model) {
        this.errorLog("request." + this.url, "Invalid Model");
        return def;
      }

      endpoint = endpoint.replace(
        "[MODEL]",
        `${model.dbname}/${model.tablename}`
      );
      const url = this.url && this.url.length > 5 ? this.url + endpoint : "";
      if (url === "") {
        return def;
      }

      const token = this.token && this.token.length > 5 ? this.token : "";
      if (token === "") {
        this.errorLog(
          "request." + url,
          "No esta configurado el token de acceso"
        );
        return def;
      }

      const options: AxiosRequestConfig = {
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${token}`,
        },
        timeout: this.timeout,
      };

      return this.execute(url, method, body, options, def);
    } catch (error) {
      return undefined;
    }
  }

  private execute(
    url: string,
    method: "GET" | "POST" | "DELETE" | "PUT" = "GET",
    body?: any,
    options?: AxiosRequestConfig,
    def?: any
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (!options) {
        options = {
          headers: {
            "Content-Type": "application/json",
          },
        };
      }

      let observable: Observable<AxiosResponse<any>> | undefined;

      const query = `${url}.${body ? "Body: " + JSON.stringify(body) : ""}`;

      switch (method) {
        case "DELETE":
          observable = this.httpService.delete(url, options);
          break;
        case "POST":
          observable = this.httpService.post(url, body, options);
          break;
        case "PUT":
          observable = this.httpService.put(url, body, options);
          break;
        default:
          observable = this.httpService.get(url, options);
          break;
      }

      if (!observable) {
        return reject({ message: "Invalid request" });
      }

      observable.subscribe({
        next: (data) => {
          if (data?.data || data?.status < 300) {
            return resolve(data.data);
          }
          this.errorLog("request", {
            message: `La consulta ${query} no devolvio informacion`,
          });
          if (def) {
            return resolve(def);
          }
          return reject({
            status: data?.status || 500,
            message: data?.data?.message || data?.statusText || "",
          });
        },
        error: (error) => {
          this.errorLog("request." + query, error, true);
          if (def) {
            return resolve(def);
          }
          return reject({
            status: error?.response?.status || 500,
            message:
              error?.response?.data?.message ||
              error?.response?.statusText ||
              "",
          });
        },
      });
    });
  }

  httppost(url: string, body?: any, options?: AxiosRequestConfig) {
    return this.execute(url, "POST", body, options);
  }

  httpget(url: string, options?: AxiosRequestConfig) {
    return this.execute(url, "GET", undefined, options);
  }

  httpput(url: string, body?: any, options?: AxiosRequestConfig) {
    return this.execute(url, "PUT", body, options);
  }

  httpdelete(url: string, options?: AxiosRequestConfig) {
    return this.execute(url, "DELETE", undefined, options);
  }

  async maxFlex(
    model: BaseConfig,
    fieldName: string,
    mockItems?: any[]
  ): Promise<string | undefined> {
    if (!fieldName) {
      return undefined;
    }

    if (this._testing) {
      if (!mockItems) {
        mockItems = this.getMockInfo(model.tablename);
      }
      const items = arraySorted(mockItems, fieldName, true);
      if (items.length > 0) {
        return (pnumber(items[0][fieldName]) + 1).toString();
      }
      return "1";
    }

    const resp = await this.request(model, `/max/[MODEL]/${fieldName}`).catch(
      errorFn
    );
    return resp || "";
  }

  async config(dbname: string): Promise<ConfigInfo[]> {
    const resp = await this.findAllFlex(
      { dbname, tablename: "config" },
      { name: { $regex: "env." } }
    ).catch(errorFn);
    if (Array.isArray(resp)) {
      const array = resp
        .filter((i) => i.name)
        .map((i) => {
          return {
            name: i.name,
            value: i.value?.toString ? i.value.toString() : "",
          };
        });

      try {
        array.forEach((i) => {
          process.env[i.name.replace("env.", "")] = i.value;
        });
      } catch (error) {
        this.errorLog("config", error);
      }
      return array;
    }

    return [];
  }

  async aggregateFlex(
    model: BaseConfig,
    conditions: AggregateCondition,
    mockItems?: any[]
  ) {
    if (
      !conditions?.$match ||
      !conditions?.$project ||
      Object.keys(conditions.$match).length === 0 ||
      Object.keys(conditions.$project).length === 0
    ) {
      return [];
    }

    if (this._testing) {
      if (!mockItems) {
        mockItems = this.getMockInfo(model.tablename);
      }

      const items = this.filterForTest(mockItems, conditions.$match);
      if (conditions.$limit) {
        return items.filter((_, index) => index < pnumber(conditions.$limit));
      }

      return items;
    }

    const resp = await this.request(
      model,
      `/aggregate/[MODEL]`,
      "POST",
      conditions
    ).catch(errorFn);

    if (Array.isArray(resp)) {
      return resp;
    }

    return [];
  }

  async findAllFlex(
    model: BaseConfig,
    filter: any,
    mockItems?: any[]
  ): Promise<any[]> {
    if (!filter) {
      return [];
    }

    if (this._testing) {
      if (!mockItems) {
        mockItems = this.getMockInfo(model.tablename);
      }
      return this.filterForTest(mockItems, filter);
    }

    const resp = await this.request(model, `/findAll/[MODEL]`, "POST", {
      filter,
    }).catch(errorFn);
    if (Array.isArray(resp)) {
      return resp;
    }
    return [];
  }

  protected filterForTest<T>(_mockItems: T[], _filter: any): T[] {
    if (!_filter || Object.keys(_filter).length === 0) {
      return _mockItems;
    }
    const filter = new FilterClass();
    return _mockItems.filter((item) => filter.apply(_filter, item));
  }

  async countFlex(
    model: BaseConfig,
    filter: any,
    mockItems?: any[]
  ): Promise<number> {
    if (!filter) {
      return -1;
    }

    if (this._testing) {
      if (!mockItems) {
        mockItems = this.getMockInfo(model.tablename);
      }
      return this.filterForTest(mockItems, filter).length;
    }

    const resp = await this.request(
      model,
      `/count/[MODEL]`,
      "POST",
      { filter },
      -1
    ).catch(errorFn);
    return resp?.count || 0;
  }

  async findOneFlex(
    model: BaseConfig,
    filter: any,
    mockItems?: any[]
  ): Promise<any | undefined> {
    const resp = await this.findAllFlex(model, filter, mockItems).catch(
      errorFn
    );
    if (Array.isArray(resp) && resp.length > 0) {
      return resp[0];
    }
    return undefined;
  }

  async findByIdFlex(
    model: BaseConfig,
    id: string,
    mockItems?: any[]
  ): Promise<any | undefined> {
    if (!id) {
      return undefined;
    }

    if (this._testing) {
      if (!mockItems) {
        mockItems = this.getMockInfo(model.tablename);
      }
      const items = this.filterForTest(mockItems, { _id: id });
      if (items.length > 0) {
        return items[0];
      }
      return undefined;
    }

    const resp = await this.request(model, `/findOne/[MODEL]/${id}`).catch(
      errorFn
    );
    return resp;
  }

  async createFlex(
    model: BaseConfig,
    item: any,
    mockItems?: any[]
  ): Promise<any | undefined> {
    if (!item) {
      return undefined;
    }

    if (this._testing) {
      if (!mockItems) {
        mockItems = this.getMockInfo(model.tablename);
      }
      const _id = new Date().getTime().toString();
      const newItem: any = {
        ...item,
        _id,
        id: _id,
        createdAt: formatDate(undefined, 0, false, "-"),
        updatedAt: formatDate(undefined, 0, false, "-"),
        numberid: await this.maxFlex(model, "numberid", mockItems),
      };
      mockItems.push(newItem);
      return newItem;
    }

    return this.request(model, `/insert/[MODEL]`, "POST", { item }).catch(
      errorFn
    );
  }

  async createManyFlex(
    model: BaseConfig,
    items: any[],
    mockItems?: any[]
  ): Promise<any | undefined> {
    if (!Array.isArray(items)) {
      return undefined;
    }

    if (this._testing) {
      if (!mockItems) {
        mockItems = this.getMockInfo(model.tablename);
      }
      let _id = new Date().getTime();
      let numberid = pnumber(await this.maxFlex(model, "numberid", mockItems));
      const newItems = items.map((item) => {
        _id++;
        numberid++;
        return {
          ...item,
          _id: _id.toString(),
          id: _id.toString(),
          createdAt: formatDate(undefined, 0, false, "-"),
          updatedAt: formatDate(undefined, 0, false, "-"),
          numberid: numberid.toString(),
        };
      });
      mockItems.push(...newItems);
      return newItems;
    }

    return this.request(model, `/insert/[MODEL]`, "POST", { items }).catch(
      errorFn
    );
  }

  async bulkFlex(
    model: BaseConfig,
    items: Array<BulkItem<any>>,
    mockItems?: any[]
  ): Promise<BulkWriteResult | undefined> {
    if (toArray(items).length === 0) {
      return undefined;
    }

    if (this._testing) {
      return undefined;
    }

    return this.request(model, `/bulk/[MODEL]`, "POST", { items }).catch(
      errorFn
    );
  }

  async deleteFlex(
    model: BaseConfig,
    id: string,
    mockItems?: any[]
  ): Promise<any | undefined> {
    if (!id) {
      return undefined;
    }

    if (this._testing) {
      if (!mockItems) {
        mockItems = this.getMockInfo(model.tablename);
      }
      const item = mockItems.find((i: any) => i._id === id);
      if (!item) {
        return false;
      }
      mockItems = mockItems.filter((i: any) => i._id !== id);
      return true;
    }

    return this.request(model, `/deleteOne/[MODEL]/${id}`, "DELETE").catch(
      errorFn
    );
  }

  async deleteManyFlex(
    model: BaseConfig,
    condition: any,
    mockItems?: any[]
  ): Promise<any | undefined> {
    if (!condition) {
      return undefined;
    }

    if (this._testing) {
      if (!mockItems) {
        mockItems = this.getMockInfo(model.tablename);
      }
      const items = this.filterForTest(mockItems, condition);
      if (items.length === 0) {
        return false;
      }
      mockItems = items;
      return true;
    }

    return this.request(model, `/delete/[MODEL]`, "POST", { condition }).catch(
      errorFn
    );
  }

  async updateFlex(
    model: BaseConfig,
    id: string,
    item: Partial<any>,
    mockItems?: any[]
  ): Promise<any | undefined> {
    if (!item || !id) {
      return undefined;
    }

    if (this._testing) {
      if (!mockItems) {
        mockItems = this.getMockInfo(model.tablename);
      }
      const item2 = mockItems.find((item1: any) => item1._id === id);
      if (!item2) {
        return undefined;
      }
      let resp: any = item2;
      mockItems.forEach((item1: any) => {
        if (item1._id === id) {
          resp = {
            ...resp,
            ...item,
          };
          item1 = resp;
          return;
        }
      });
      return resp;
    }

    return this.request(model, `/updateOne/[MODEL]/${id}`, "PUT", {
      item,
    }).catch(errorFn);
  }

  async updateManyFlex(
    model: BaseConfig,
    item: Partial<any>,
    condition: any,
    mockItems?: any[]
  ): Promise<any[]> {
    if (!item || !condition) {
      return [];
    }

    if (this._testing) {
      if (!mockItems) {
        mockItems = this.getMockInfo(model.tablename);
      }
      const items = this.filterForTest(mockItems, condition);
      if (items.length === 0) {
        return [];
      }
      const resp: any[] = [];
      for (const itemp of items) {
        mockItems.forEach((item1: any) => {
          if (item1._id === itemp.id) {
            item1 = {
              ...item1,
              ...item,
            };
            resp.push(item1);
            return;
          }
        });
      }
      return resp;
    }

    return this.request(model, `/update/[MODEL]`, "PUT", {
      item,
      condition,
    }).catch(errorFn);
  }
}

export default FlexService;

const errorFn = (_error: any) => {
  return;
};

export interface ConfigInfo {
  name: string;
  value: string;
}

export interface AggregateItem {
  [value: string]: any;
}

export interface AggregateSort {
  [value: string]: 1 | -1;
}

export interface AggregateFormat {
  fieldName: string;
  fieldType: "boolean" | "number" | "array" | "object" | "string" | "date";
}

export interface AggregateCondition {
  $match: AggregateItem;
  $project: AggregateItem;
  $group?: {
    _id: any;
    [key: string]: any;
  };
  $sort?: AggregateSort;
  $limit?: number;
  $format?: AggregateFormat[];
}
