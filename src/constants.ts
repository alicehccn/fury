import path from "path";

export const romanizeNumberMapping = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1
};

export const viewPath = path.join(__dirname, '../views/index')
export const inputFileType = 'csv'
export const htmlFileType = 'pug'
export const titles = ['agot', 'acok', 'asos', 'affc', 'adwd']
