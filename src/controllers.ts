import { htmlFileType, inputFileType, titles, viewPath } from './constants'
import csv from 'csv-parser'
import { Response } from 'express'
import fs from 'fs'
import path from 'path'
import { compileHtml, countIndex, romanizeNumber } from './utils'

export function getChapters (filename: string, res: Response) {
  if (titles.indexOf(filename) < 0) {
    return res.send('Book not found')
  }
  const chapters: Chapter[] = []
  const characters = {}

  try {
    fs.createReadStream(path.join(__dirname, `../${filename}.${inputFileType}`))
      .pipe(csv())
      .on('data', (data) => {
        chapters.push(data)
      })
      .on('end', () => {
        chapters.map((chapter: Chapter) => {
          chapter.suffix = romanizeNumber(countIndex(characters, chapter))
        })
        compileHtml(`${viewPath}.${htmlFileType}`, chapters)
        res.render(viewPath, {chapters, title: filename.toUpperCase()});
      })
      .on('error', (error) => {
        res.send(error)
      })
  } catch (error) {
    res.send(error)
  }
  
}
