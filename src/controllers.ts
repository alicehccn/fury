import csv from 'csv-parser'
import { Response } from 'express'
import fs from 'fs'
import { countIndex, inspectData } from './utils'

export function getChapters (filename: string, res: Response) {
  if (!filename || filename === 'favicon.ico') {
    return res.send('Book not found')
  }
  const chapters: Chapter[] = []
  const characters = {}
  try {
      fs.createReadStream(`${__dirname}/data/${filename}.csv`)
      .pipe(csv())
      .on('data', (data) => {
        chapters.push(data)
      })
      .on('end', () => {
        chapters.map((chapter: Chapter) => {
          chapter.suffix = countIndex(characters, chapter)
          inspectData(chapter)
        })
        res.send(chapters)
      .on('error', (error) => {
        res.send(error)
      })
    })
  } catch (error) {
    res.send(error)
  }
  
}
