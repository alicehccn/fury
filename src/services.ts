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
    if (characters[ch.name]) {
      characters[ch.name].push(ch.identities)
    } else {
      characters[ch.name] = ch.identities
    }
  })
  const html = pug.renderFile(path.join(__dirname, '../views/characters.pug'), {characters: result.rows})
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

export async function addCharacter(name: string) {
  try {
    const result = await db.addCharacter(name)
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

export async function addIdentity (name: string, identity: string) {
  try {
    const character = await db.getCharacterByName(name)
    const characterId = character?.rows[0]?.id
    if (!characterId) {
      console.log('Character not found')
      return ('Character not found')
    }
    const result = await db.addIdentity(characterId, identity)
    return `Added ${result.rowCount} row(s)`
  } catch (error) {
    return error
  }
}
