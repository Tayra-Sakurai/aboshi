export type MuiDirection = "desc" | "asc";

export function sortByKey<
  K extends keyof T,
  T extends {
    [key in K]: string;
  } & {
    [x: string]: any;
  }
>(key: K, direction: MuiDirection, values: T[]): (a: T, b: T) => number;
export function sortByKey<
  K extends keyof T,
  T extends {
    [key in K]: number;
  } & {
    [x: string]: any;
  }
>(key: K, direction: MuiDirection, values: T[]): (a: T, b: T) => number;
export function sortByKey<
  K extends keyof T,
  T extends {
    [key in K]: Date;
  } & {
    [x: string]: any;
  }
>(key: K, direction: MuiDirection, values: T[]): (a: T, b: T) => number;

export function sortByKey<
  K extends keyof T,
  S extends string | Date | number,
  T extends {
    [key in K]: S;
  } & {
    [x: string]: any;
  }
>(key: K, direction: MuiDirection, values: T[]): (a: T, b: T) => number {
  if (values.length === 0)
    throw new TypeError("Can't use an empty array.");
  const firstValue: string | Date | number = values[0][key];
  if (typeof firstValue === "number")
    return direction === 'asc' ?
      (a: T, b: T) => a[key] - b[key] :
      (a: T, b: T) => b[key] - a[key];
  if (typeof firstValue === 'string')
    return direction === 'asc' ?
      (a: T, b: T) => a[key].localeCompare(b[key]) :
      (a: T, b: T) => b[key].localeCompare(a[key]);

  if (typeof firstValue === 'object')
    if (!!firstValue && firstValue instanceof Date)
      return direction === 'asc' ?
        (a: T, b: T) => a[key].getTime() - b[key].getTime() :
        (a: T, b: T) => b[key].getTime() - a[key].getTime();
  throw new TypeError('Unexpected types.');
}