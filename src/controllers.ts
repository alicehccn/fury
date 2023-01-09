import csv from 'csv-parser'
import { Response } from 'express'
import fs from 'fs'
import path from 'path'
import { compileHtml, countIndex, romanizeNumber } from './utils'

export function getChapters (filename: string, res: Response) {
  const book = ['agot', 'acok', 'asos']
  if (book.indexOf(filename) < 0) {
    return res.send('Book not found')
  }
  const chapters: Chapter[] = []
  const characters = {}
  try {
      fs.createReadStream(path.join(__dirname, `../${filename}.csv`))
      .pipe(csv())
      .on('data', (data) => {
        chapters.push(data)
      })
      .on('end', () => {
        chapters.map((chapter: Chapter) => {
          chapter.suffix = romanizeNumber(countIndex(characters, chapter))
        })
        compileHtml(path.join(__dirname, '../views/index.pug'), chapters)
        res.render(path.join(__dirname, '../views/index'), {chapters, title: filename.toUpperCase()});
      })
      .on('error', (error) => {
        res.send(error)
      })
  } catch (error) {
    res.send(error)
  }
  
}
