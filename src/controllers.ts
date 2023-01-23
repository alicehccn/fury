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

export async function deleteChapter(name: string, suffix: string, title: string, res: Response) {
  try {
    const result = await service.deleteChapter(name, suffix, title)
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

export async function updateCharacter(oldName: string, newName: string, res: Response) {
  try {
    const result = await service.updateCharacter(oldName, newName)
    res.send(result)
  } catch (error) {
    return error
  }
}

export async function addTitle(name: string, res: Response) {
  try {
    const result = await service.addTitle(name)
    res.send(result)
  } catch (error) {
    return error
  }
}

export async function deleteTitle(slug: string, res: Response) {
  try {
    const result = await service.deleteTitle(slug)
    res.send(result)
  } catch (error) {
    res.send(error)
  }
}

export async function addCharacter(name: string, res: Response) {
  try {
    const result = await service.addCharacter(name)
    res.send(result)
  } catch (error) {
    return error
  }
}

export async function deleteCharacter(slug: string, res: Response) {
  try {
    const result = await service.deleteCharacter(slug)
    res.send(result)
  } catch (error) {
    res.send(error)
  }
}