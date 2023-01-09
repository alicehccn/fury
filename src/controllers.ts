import csv from 'csv-parser'
import { Response } from 'express'
import fs from 'fs'

interface Chapter {
  name: string
  page: number
}

export function getChapters (filename: string, res: Response) {
  if (!filename) {
    res.send('Book not found')
  }
  if (filename === 'favicon.ico') {
    return
  }
  const chapters: Chapter[] = []
  try {
      fs.createReadStream(`${__dirname}/data/${filename}.csv`)
      .pipe(csv())
      .on('data', (data) => chapters.push(data))
      .on('end', () => {
        inspectData(chapters)
        res.send(chapters)
      .on('error', (error) => {
        res.send(error)
      })
    })
  } catch (error) {
    res.send(error)
  }
  
}

function inspectData(chapters) {
  chapters.map((chapter) => {
    let divider = '' ;
    const minLength = 5
    const charLen = chapter.name?.length
    for (let i = 0; i < minLength - charLen + minLength; i++) {
      divider += ' '
    }
    divider += '... ... ... ...   '
    console.log(chapter.name, divider, chapter.page)
  })
} 