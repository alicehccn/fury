import pug from 'pug'
import path from 'path'
import { romanizedInt } from './utils'
import * as db from './db'
import * as utils from './utils'

export async function getAllTitles () {
  const result = await db.getAllTitles()
  const html = pug.renderFile(path.join(__dirname, '../views/titles.pug'), {titles: result.rows})
  return html
}

export async function getChaptersByTitle (slug: string) {
  const result = await db.getChaptersByTitle(slug)
  const html = pug.renderFile(path.join(__dirname, '../views/title.pug'), {title: result.rows[0].title, chapters: result.rows, slug})
  return html
}

export async function getChapterDetails (slug: string, chapter: string) {
  const chapterDetails = await db.getChapterDetails(slug, chapter)
  const allChapters = await db.getChaptersByTitle(slug)
  const title = await db.getTitleBySlug(slug)
  const [prev, next] = utils.getPrevNextChapter(+chapter, allChapters.rowCount)
  const html = pug.renderFile(path.join(__dirname, '../views/title.pug'), {title: title.rows[0].title, chapters: allChapters.rows, slug, details: chapterDetails.rows[0], modalOpen: !!chapter, prev, next})
  return html
}

export async function getChaptersByLocation(location: string) {
  const result = await db.getChaptersByLocation(location)
  const total = result.rowCount
  const continent = result.rows[0]?.continent
  const chapters = {}
  result.rows.forEach((row: Title) => {
    if (chapters[row.title]) {
      chapters[row.title].push(row)
    } else {
      chapters[row.title] = [row]
    }
  })
  const characterRows = await db.getCharactesByLocation(location)
  const visitors = characterRows.rows
  const html = pug.renderFile(path.join(__dirname, '../views/location.pug'), {header: location, chapters, continent, total, visitors, title: location})
  return html
}

export async function getChaptersByCharacter(name: string) {
  const result = await db.getChaptersByCharacter(name)
  const temp = await db.getCharacterSummaries()
  const character = temp.rows.filter(row => row.character === name)[0]
  const total = result.rowCount
  const { house, rank, alias } = character
  const chapters = {}
  result.rows.forEach((row: Title) => {
    if (chapters[row.title]) {
      chapters[row.title].push(row)
    } else {
      chapters[row.title] = [row]
    }
  })
  const html = pug.renderFile(path.join(__dirname, '../views/character.pug'), {header: name, chapters, total, house, rank, alias, title: name})
  return html
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

export async function addCharacter(name: string, house: string) {
  try {
    const result = await db.addCharacter(name, house)
    return `Added ${result.rowCount} row(s)`
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

