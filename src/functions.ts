export function toArray<T>(array?: T[] | void): T[] {
  if (!Array.isArray(array)) {
    return [];
  }
  return array;
}

export class ArrayList {
  private _items: string[] = [];

  constructor(private _excluded: string = "") {}

  concat(value: ArrayList) {
    return this._items.concat(value._items);
  }

  push(value?: string) {
    if (value && value !== this._excluded && this._items.indexOf(value) < 0) {
      this._items.push(value);
    }
  }

  get(): string[] {
    return this._items;
  }

  count() {
    return this._items.length;
  }
}

export interface ArrayComplexItem {
  id: string;
  items: string[];
}

export class ArrayComplexList {
  constructor(private _items: ArrayComplexItem[] = []) {}

  push(value: string, item: string) {
    let index = this._items.findIndex((i) => i.id === value);
    if (index < 0) {
      index = this._items.length;
      this._items.push({
        id: value,
        items: [],
      });
    }
    this._items[index].items.push(item);
  }

  get(): ArrayComplexItem[] {
    return this._items;
  }

  getItems(id: string): string[] {
    return toArray(this._items.find((i) => i.id === id)?.items);
  }

  count() {
    return this._items.length;
  }

  countItems(id: string) {
    return this.getItems(id).length;
  }
}

export const formatDate = (
  fecha?: Date,
  days: number = 0,
  utc: boolean = false,
  separator: "-" | "/" = "-"
): string => {
  if (!fecha) {
    fecha = new Date();
  }

  if (days) {
    fecha.setDate(fecha.getDate() + days);
  }

  const m = completeText(fecha.getMonth() + 1);
  const d = completeText(fecha.getDate());
  const h = completeText(fecha.getHours());
  const M = completeText(fecha.getMinutes());
  const y = fecha.getFullYear().toString();
  const s = completeText(fecha.getSeconds());
  const ml = completeText(fecha.getMilliseconds(), 3);

  if (separator === "/") {
    return `${d}/${m}/${y} ${h}:${M}`;
  }

  const res = `${y}-${m}-${d}`;

  if (utc) {
    return `${res}T${h}:${M}:${s}.${ml}+0300`;
  }

  return `${res} ${h}:${M}:${s}.${ml}`;
};

export const replaceAll = (
  text: string,
  older: string[],
  newer: string[]
): string => {
  if (!text || !older || !newer || older.length !== newer.length) {
    return text;
  }
  for (let index = 0; index < older.length; index++) {
    const item = older[index];
    let control = 100;
    while (control > 0 && text.includes(item)) {
      text = text.replace(item, newer[index]);
      control--;
    }
  }
  return text;
};

export const padLeadingZeros = (num?: string, size: number = 8): string => {
  let str = toString(num) + "";
  while (str.length < size) {
    str = "0" + str;
  }
  return str;
};

export const parseNumber = (value: any, def: number = 0): number => {
  try {
    let fvalue: string = value.toString();
    const neg: number = fvalue.startsWith("-") ? -1 : 1;
    if (fvalue.includes(",") && fvalue.includes(".")) {
      if (fvalue.lastIndexOf(",") > fvalue.lastIndexOf(".")) {
        fvalue = replaceAll(fvalue, ["."], ["|"]);
        fvalue = replaceAll(fvalue, [","], ["."]);
        fvalue = replaceAll(fvalue, ["|"], [""]);
      } else {
        fvalue = replaceAll(fvalue, [","], [""]);
      }
    }

    const parts = replaceAll(
      replaceAll(fvalue, ["-"], [""]),
      [","],
      ["."]
    ).split(".");
    if (parts.length > 2 || parts.length === 0) {
      return def;
    }

    const resp: number[] = [];
    for (const part of parts) {
      if (parseInt(part, 0) >= 0) {
        resp.push(parseInt(part, 0));
      } else {
        return def;
      }
    }
    const fnumber = parseFloat(resp.join("."));
    if (fnumber === 0) {
      return fnumber;
    }
    return fnumber * neg;
  } catch (error) {
    return def;
  }
};

export const emailIsValid = (value: string): boolean => {
  const emailRegex =
    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  if (!emailRegex.test(value)) {
    return false;
  }
  return true;
};

export const getValue = (
  item: any,
  names: string[],
  def: string = ""
): string => {
  for (const name of names) {
    const resp = item[name];
    if (resp) {
      return resp;
    }
  }
  return def;
};

export const completeText = (value: number, size: number = 2): string => {
  let resp = value.toString();
  while (resp.length < size) {
    resp = `0${resp}`;
  }

  return resp;
};

export const arraySorted = (
  array: any[],
  fieldName: string,
  desc?: boolean
): any[] => {
  const newArray = [...array];
  let OK = -1;
  let notOK = 1;
  if (desc) {
    [OK, notOK] = [notOK, OK];
  }
  return newArray.sort((a, b) => (a[fieldName] < b[fieldName] ? OK : notOK));
};

export const errorFn = (_error: any) => {
  return;
};

export const toString = (value: any, def: string = ""): string => {
  try {
    return (value || def || "").toString();
  } catch (error) {
    return "";
  }
};

export const testIsRunning = (): boolean => {
  return process.env.NODE_ENV === "development";
};
