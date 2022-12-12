import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { BulkItem, BulkWriteResult } from "./base.model";
import { AggregateCondition, BaseConfig, FlexService } from "./flex.service";

@Injectable()
export class BaseService<T> extends FlexService {
  constructor(protected model: BaseConfig, protected httpService: HttpService) {
    super(model.dbname + "_" + model.tablename, httpService);
  }

  async configValue(name: string): Promise<any> {
    const item = await this.findOneFlex(
      { dbname: this.model.dbname, tablename: "config" },
      { name }
    );
    return item?.value;
  }

  async max(fieldName: string): Promise<string | undefined> {
    return this.maxFlex(this.model, fieldName);
  }

  async count(filter: any): Promise<number> {
    return this.countFlex(this.model, filter);
  }

  async findAll(filter: any): Promise<T[]> {
    return this.findAllFlex(this.model, filter);
  }

  async aggregate(conditions: AggregateCondition): Promise<T[]> {
    return this.aggregateFlex(this.model, conditions);
  }

  async findOne(filter: any): Promise<T | undefined> {
    return this.findOneFlex(this.model, filter);
  }

  async findById(id: string): Promise<T | undefined> {
    return this.findByIdFlex(this.model, id);
  }

  async create(item: T): Promise<T | undefined> {
    return this.createFlex(this.model, item);
  }

  async createMany(items: T[]): Promise<T[] | undefined> {
    return this.createManyFlex(this.model, items);
  }

  async bulk(items: Array<BulkItem<T>>): Promise<BulkWriteResult | undefined> {
    return this.bulkFlex(this.model, items);
  }

  async delete(id: string): Promise<T | undefined> {
    return this.deleteFlex(this.model, id);
  }

  async deleteMany(condition: any): Promise<T | undefined> {
    return this.deleteManyFlex(this.model, condition);
  }

  async update(id: string, item: Partial<T>): Promise<T | undefined> {
    return this.updateFlex(this.model, id, item);
  }

  async updateMany(item: Partial<T>, condition: any): Promise<T[]> {
    return this.updateManyFlex(this.model, item, condition);
  }
}

export default BaseService;
