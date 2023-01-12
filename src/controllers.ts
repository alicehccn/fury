import { Titles } from './constants'
import { Response } from 'express'
import fs from 'fs'
import * as service from './services'

export function getChaptersByTitle (filename: string, res: Response) {
  if (Titles.indexOf(filename) < 0) {
    return res.send('Book not found')
  }
  try {
    fs.readFile(`data/${filename}.json`, 'utf8', function (err, data) {
      if (err) throw err
      const chapters = JSON.parse(data)
      res.send(chapters)
    })
  } catch (error) {
    res.send(error)
  }
}

export async function getChaptersByCharacter(name: string, res: Response) {
  try {
    const chapters = await service.getChaptersByCharacter(name)
    res.send(chapters)
  } catch (error) {
    res.send(error)
  }
}
