type CacheParam = any;

export class FilterClass {
  private complex: boolean = false;

  isComplex(): boolean {
    return this.complex;
  }

  private analizeComplexFilter(filter: CacheParam, item: CacheParam): boolean {
    let resp = false;

    for (const [key] of Object.entries(filter)) {
      const value = item ? item[key] : undefined;

      if (Array.isArray(filter[key])) {
        if (key === "$nin") {
          resp = filter[key].indexOf(item) < 0;
        } else {
          resp = filter[key].indexOf(key === "$in" ? item : value) >= 0;
        }
      } else if (key === "$exists") {
        resp = item ? filter[key] : !filter[key];
      } else if (key === "$gt") {
        resp = item > filter[key];
      } else if (key === "$lt") {
        resp = item < filter[key];
      } else if (key === "$gte") {
        resp = item >= filter[key];
      } else if (key === "$lte") {
        resp = item <= filter[key];
      } else if (key === "$eq") {
        resp = item === filter[key];
      } else if (key === "$ne") {
        resp = item !== filter[key];
      } else if (key.startsWith("$")) {
        this.complex = true;
        resp = false;
      } else if (filter[key] instanceof Object) {
        resp = this.analizeComplexFilter(filter[key], value);
      } else {
        resp = filter[key] === value;
      }

      if (!resp) {
        break;
      }
    }

    if (this.complex) {
      return true;
    }
    return resp;
  }

  private applyFilterOr(filters: CacheParam[], item: CacheParam): boolean {
    if (!item || !Array.isArray(filters)) {
      return false;
    }

    let resp = false;

    for (const filter of filters) {
      resp = this.applyFilter(filter, item, false);
      if (resp) {
        break;
      }
    }

    return resp;
  }

  apply(ffilter: CacheParam, item: CacheParam): boolean {
    if (this.complex) {
      return true;
    }
    return this.applyFilter(ffilter, item);
  }

  private applyFilter(
    ffilter: CacheParam,
    item: CacheParam,
    checkOr: boolean = true
  ): boolean {
    if (!item) {
      return false;
    }

    let resp = false;

    if (
      checkOr &&
      Array.isArray(ffilter?.$or) &&
      Object.keys(ffilter).length === 1
    ) {
      return this.applyFilterOr(ffilter.$or, item);
    }

    for (const [key] of Object.entries(ffilter)) {
      if (key === "$or") {
        const array = Array.isArray(ffilter[key]) ? ffilter[key] : [];
        for (const itema of array) {
          resp = this.apply(itema, item);
          if (resp) {
            break;
          }
        }
      } else if (key.startsWith("$")) {
        this.complex = true;
        resp = false;
      } else if (Array.isArray(ffilter[key])) {
        resp = ffilter[key].indexOf(item[key]) >= 0;
      } else if (ffilter[key] instanceof Object) {
        resp = this.analizeComplexFilter(ffilter[key], item[key]);
      } else {
        resp = ffilter[key] === item[key];
      }
      if (!resp) {
        break;
      }
    }
    return resp;
  }
}
