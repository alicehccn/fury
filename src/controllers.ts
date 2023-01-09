import csv from 'csv-parser'
import { Response } from 'express'
import fs from 'fs'
const results: unknown[] = []

export function readData (filename: string, res: Response) {
  if (!filename) {
    res.send('Book not found')
  }
  fs.createReadStream(`${__dirname}/data/${filename}.csv`)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    res.send(results)
  })
}
