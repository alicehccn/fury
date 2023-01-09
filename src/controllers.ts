import csv from 'csv-parser'
import { Response } from 'express'
import fs from 'fs'

interface Chapter {
  name: string
  page: number
  suffix?: number
}

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
          characters[chapter.name] = characters[chapter.name] || 1
          chapter.suffix = characters[chapter.name]
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

function inspectData(chapter: Chapter) {
  let divider = '' ;
  const minLength = 5
  const charLen = chapter.name?.length
  for (let i = 0; i < minLength - charLen + minLength; i++) {
    divider += ' '
  }
  divider += '... ... ... ...   '
  console.log(chapter.name, chapter.suffix, divider, chapter.page)
}
