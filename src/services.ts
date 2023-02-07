import pug from 'pug'
import path from 'path'
import { romanizedInt } from './utils'
import * as db from './db'

export async function getAllTitles () {
  const result = await db.getAllTitles()
  const html = pug.renderFile(path.join(__dirname, '../views/titles.pug'), {titles: result.rows})
  return html
}

export async function getChaptersByTitle (slug: string) {
  const result = await db.getChaptersByTitle(slug)
  const title = await db.getTitleBySlug(slug)
  const html = pug.renderFile(path.join(__dirname, '../views/chapters.pug'), {title: title.rows[0].title, chapters: result.rows})
  return html
}

export async function getAllCharacters() {
  const result = await db.getAllCharacters()
  const characters = {}
  result.rows.forEach((ch: Character) => {
    const character = `${ch.name}`
    if (characters[character] && ch.role) {
      characters[character].push(ch.role)
    } else {
      characters[character] = ch.role ? [ch.role] : ''
    }
  })
  const html = pug.renderFile(path.join(__dirname, '../views/characters.pug'), {characters})
  return html
}

export async function getCharactersByHouse(house: string) {
  const result = await db.getCharactersByHouse(house)
  const characters = {}
  result.rows.forEach((row) => {
    if (characters[row.name]) {
      characters[row.name].push(row)
    } else {
      characters[row.name] = [row]
    }
  })
  const html = pug.renderFile(path.join(__dirname, '../views/house.pug'), {characters, house})
  return html
}

export async function getChaptersByCharacter(name: string) {
  const result = await db.getChaptersByCharacter(name)
  const chaptersPerTitle = {}
  result.rows.forEach((row: Title) => {
    if (chaptersPerTitle[row.title]) {
      chaptersPerTitle[row.title].push(row)
    } else {
      chaptersPerTitle[row.title] = [row]
    }
  })
  const html = pug.renderFile(path.join(__dirname, '../views/character.pug'), {header: name, chapters: chaptersPerTitle})
  return html
}

export async function deleteChapter(page: string | number, title: string) {
  try {
    const result = await db.deleteChapter(page, title)
    return `Delete ${result.rowCount} row(s)`
  } catch (error) {
    return error
  }
}

export async function addChapter(name: string, page: number | string, title: string) {
  try {
    const temp = await db.getAppearances(name, title)
    const characters = await db.getAllCharacters()
    const suffix = characters.rowCount > 0 ? romanizedInt(temp.rowCount) : null
    const result = await db.addChapter(name, suffix, page, title)
    return `Added ${result.rowCount} row(s)`
  } catch (error) {
    return error
  }
}

export async function addTitle(name: string) {
  try {
    const result = await db.addTitle(name)
    return `Added ${result.rowCount} row(s)`
  } catch (error) {
    return error
  }
}

export async function deleteTitle(slug: string) {
  try {
    const result = await db.deleteTitle(slug)
    return `Delete ${result.rowCount} row(s)`
  } catch (error) {
    return error
  }
}

export async function addCharacter(name: string, house: string) {
  try {
    const result = await db.addCharacter(name, house)
    return `Added ${result.rowCount} row(s)`
  } catch (error) {
    return error
  }
}

export async function deleteCharacter(name: string) {
  try {
    const result = await db.deleteCharacter(name)
    return `Delete ${result.rowCount} row(s)`
  } catch (error) {
    return error
  }
}

export async function addRole (name: string, role: string) {
  try {
    const character = await db.getCharacterByName(name)
    const characterId = character?.rows[0]?.id
    if (!characterId) {
      console.log('Character not found')
      return ('Character not found')
    }
    const result = await db.addRole(name, role)
    return `Added ${result.rowCount} row(s)`
  } catch (error) {
    return error
  }
}

export async function addHouse (house: string, sigil: string, words: string) {
  try {
    const result = await db.addHouse(house, sigil, words)
    return `Added ${result.rowCount} row(s)`
  } catch (error) {
    return error
  }
}

export async function getAllHouses () {
  const houses = await db.getAllHouses()
  const html = pug.renderFile(path.join(__dirname, '../views/houses.pug'), {houses: houses.rows})
  return html
}
