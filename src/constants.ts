import path from 'path'

export const RomanizeNumberMapping = {
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
}

export const ViewPath = path.join(__dirname, '../views/index')
export const InputFileType = 'csv'
export const HtmlParser = 'pug'
export const Titles = ['agot', 'acok', 'asos', 'affc', 'adwd']

export const POV = [
  'Arya',
  'Sansa',
  'Tyrion',
  'Bran',
  'Jaime',
  'Jon',
  'Catelyn',
  'Davos',
  'Theon',
  'Daenerys',
  'Samwell',
]