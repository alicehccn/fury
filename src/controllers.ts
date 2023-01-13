import { Response } from 'express'
import * as service from './services'
import path from 'path'
import pug from 'pug'

export async function getAllTitles (res: Response) {
  try {
    const titles = await service.getAllTitles()
    const html = pug.renderFile(path.join(__dirname, '../views/index.pug'), {titles: titles})
    res.send(html)
  } catch(error) {
    res.send(error)
  }
}

export async function getChaptersByTitle (title: string, res: Response) {
  try {
    const chapters = await service.getChaptersByTitle(title)
    res.send(chapters)
  } catch(error) {
    res.send(error)
  }
}

export async function getAllCharacters (res: Response) {
  try {
    const characters = await service.getAllCharacters()
    res.send(characters)
  } catch(error) {
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
