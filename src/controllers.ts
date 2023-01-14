import { Response } from 'express'
import * as service from './services'
import path from 'path'
import pug from 'pug'

export async function getAllTitles (res: Response) {
  try {
    const titles = await service.getAllTitles()
    res.send(titles)
  } catch(error) {
    res.send(error)
  }
}

export async function getChaptersByTitle (title: string, res: Response) {
  try {
    const chapters = await service.getChaptersByTitle(title)
    const html = pug.renderFile(path.join(__dirname, '../views/chapters.pug'), {header: title, chapters})
    res.send(html)
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
    const html = pug.renderFile(path.join(__dirname, '../views/character.pug'), {header: name, chapters})
    res.send(html)
  } catch (error) {
    res.send(error)
  }
}
