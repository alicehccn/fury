import { Response } from 'express'
import * as service from './services'

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

export async function deleteChapter(id: string, res: Response) {
  try {
    const result = await service.deleteChapter(id)
    res.send(result)
  } catch (error) {
    res.send(error)
  }
}

export async function addChapter(name: string, suffix: string, page: string | number, title: string, res: Response) {
  try {
    const result = await service.addChapter(name, suffix, page, title)
    res.send(result)
  } catch (error) {
    return error
  }
}
