import csv from 'csv-parser'
import fs from 'fs'
const results: unknown[] = []

export default function readData () {
  console.log(__dirname)
  fs.createReadStream(__dirname + '/data/acok.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results)
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  })
}
