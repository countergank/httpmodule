import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { existsSync, writeFileSync } from "fs";
import { configurationGet } from "../configuration.service";
import { parseNumber, toArray } from "../functions";
import { BulkItem, BulkWriteResult } from "./base.model";
import { AggregateCondition, BaseConfig, FlexService } from "./flex.service";

@Injectable()
export class BaseFullService<T> extends FlexService {
  private _mockItems: T[] = [];

  constructor(
    protected model: BaseConfig,
    protected httpService: HttpService,
    private mockArray: T[] = []
  ) {
    super(model.dbname + "_" + model.tablename, httpService);
    this._mockItems = Array.isArray(this.mockArray) ? this.mockArray : [];
    if (this._testing) {
      if (this._mockItems.length === 0) {
        this._mockItems.push(...this.getMockInfo(model.tablename));
      }
      this.debugLog(
        "TESTING IS RUNNING",
        JSON.stringify({
          model: this.model,
          lenmock: this._mockItems.length,
        }),
        "W"
      );
    }

    if (configurationGet("MOCK_GENERATE") === "1") {
      this.generateMock();
    }
  }

  async configValue(name: string): Promise<any> {
    const item = await this.findOneFlex(
      { dbname: this.model.dbname, tablename: "config" },
      { name }
    );
    return item?.value;
  }

  async generateMock(fileName?: string) {
    if (!fileName) {
      fileName = this.getMockFileName(this.model.tablename);
    }
    if (!existsSync(fileName)) {
      writeFileSync(fileName, "[]", "utf-8");
      const items = (await this.findAll({})).filter((_i, index) => index < 10);
      writeFileSync(fileName, JSON.stringify(items), "utf-8");
      return items;
    }
  }

  private cacheEnabled: boolean = false;
  private cacheItems: T[] = [];

  public runCache(timeout?: number) {
    setTimeout(async () => {
      timeout = parseNumber(
        configurationGet(`cache.${this.model.tablename.toLowerCase()}`)
      );
      if (timeout > 0) {
        const newItems = await this.findAll({});
        this.debugLog(
          "CACHE ENABLED",
          `Model: ${JSON.stringify(this.model)}. Timeout: ${timeout}. Items: ${
            toArray(newItems).length
          }`,
          "W"
        );
        if (Array.isArray(newItems)) {
          this.cacheItems.splice(0, this.cacheItems.length);
          this.cacheItems.push(...newItems);
          this.cacheEnabled = true;
        }
      } else {
        timeout = 10000;
        this.cacheEnabled = false;
      }
      this.runCache(timeout);
    }, timeout);
  }

  async max(fieldName: string): Promise<string | undefined> {
    if (this.cacheEnabled && !this._testing) {
      return this.maxFlex(this.model, fieldName, this.cacheItems);
    }
    return this.maxFlex(this.model, fieldName, this._mockItems);
  }

  async count(filter: any): Promise<number> {
    if (this.cacheEnabled && !this._testing) {
      return this.countFlex(this.model, filter, this.cacheItems);
    }
    return this.countFlex(this.model, filter, this._mockItems);
  }

  async findAll(filter: any): Promise<T[]> {
    if (this.cacheEnabled && !this._testing) {
      return this.findAllFlex(this.model, filter, this.cacheItems);
    }
    return this.findAllFlex(this.model, filter, this._mockItems);
  }

  async aggregate(conditions: AggregateCondition): Promise<T[]> {
    if (this.cacheEnabled && !this._testing) {
      return this.aggregateFlex(this.model, conditions, this.cacheItems);
    }
    return this.aggregateFlex(this.model, conditions, this._mockItems);
  }

  async findOne(filter: any): Promise<T | undefined> {
    if (this.cacheEnabled && !this._testing) {
      return this.findOneFlex(this.model, filter, this.cacheItems);
    }
    return this.findOneFlex(this.model, filter, this._mockItems);
  }

  async findById(id: string): Promise<T | undefined> {
    if (this.cacheEnabled && !this._testing) {
      return this.findByIdFlex(this.model, id, this.cacheItems);
    }
    return this.findByIdFlex(this.model, id, this._mockItems);
  }

  async create(item: T): Promise<T | undefined> {
    const newItem = await this.createFlex(this.model, item, this._mockItems);
    if (newItem && this.cacheEnabled && !this._testing) {
      this.cacheItems.push(newItem);
    }
    return newItem;
  }

  async createMany(items: T[]): Promise<T[] | undefined> {
    const newItems = await this.createManyFlex(
      this.model,
      items,
      this._mockItems
    );
    if (newItems && this.cacheEnabled && !this._testing) {
      this.cacheItems.push(...newItems);
    }
    return newItems;
  }

  async bulk(items: Array<BulkItem<T>>): Promise<BulkWriteResult | undefined> {
    const res = await this.bulkFlex(this.model, items, this._mockItems);
    if (res && this.cacheEnabled && !this._testing) {
      this.runCache();
    }
    return res;
  }

  async delete(id: string): Promise<boolean> {
    const item = await this.deleteFlex(this.model, id, this._mockItems);
    if (item && this.cacheEnabled && !this._testing) {
      this.cacheItems = this.cacheItems.filter((i: any) => i._id !== id);
    }
    return item;
  }

  async deleteMany(condition: any): Promise<boolean> {
    const item = await this.deleteManyFlex(
      this.model,
      condition,
      this._mockItems
    );
    if (item && this.cacheEnabled && !this._testing) {
      const items = this.filterForTest(this.cacheItems, condition);
      this.cacheItems = this.cacheItems.filter(
        (i: any) => !items.some((j: any) => j._id === i._id)
      );
    }
    return item;
  }

  async update(id: string, item: Partial<T>): Promise<T | undefined> {
    const newItem = await this.updateFlex(
      this.model,
      id,
      item,
      this._mockItems
    );
    if (newItem && this.cacheEnabled && !this._testing) {
      this.cacheItems = this.cacheItems
        .filter((i: any) => i._id !== id)
        .concat([newItem]);
    }
    return newItem;
  }

  async updateMany(item: Partial<T>, condition: any): Promise<T[]> {
    const newItems = await this.updateManyFlex(
      this.model,
      item,
      condition,
      this._mockItems
    );
    if (newItems && this.cacheEnabled && !this._testing) {
      const items = this.filterForTest(this.cacheItems, condition);
      this.cacheItems = this.cacheItems
        .filter((i: any) => !items.some((j: any) => j._id === i._id))
        .concat(newItems);
    }
    return newItems;
  }
}

export default BaseFullService;
