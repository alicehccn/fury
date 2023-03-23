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

export async function getChaptersByCharacter(name: string, res: Response) {
  try {
    const chapters = await service.getChaptersByCharacter(name)
    res.send(chapters)
  } catch (error) {
    res.send(error)
  }
}

export async function getChaptersByLocation(location: string, res: Response) {
  try {
    const chapters = await service.getChaptersByLocation(location)
    res.send(chapters)
  } catch (error) {
    res.send(error)
  }
}

export async function addChapter(name: string, page: string | number, title: string, res: Response) {
  try {
    const result = await service.addChapter(name, page, title)
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

export async function addCharacter(name: string, house: string, res: Response) {
  try {
    const result = await service.addCharacter(name, house)
    res.send(result)
  } catch (error) {
    return error
  }
}

export async function addRole (character: string, role: string, res: Response) {
  try {
    const result = await service.addRole(character, role)
    res.send(result)
  } catch (error) {
    return error
  }
}

export async function addHouse (house: string, sigil: string, words: string, res: Response) {
  try {
    const result = await service.addHouse(house, sigil, words)
    res.send(result)
  } catch (error) {
    return error
  }
}
