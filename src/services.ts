import pug from 'pug'
import path from 'path'
import { createPool } from './db'
import { randomUUID } from 'crypto'
import { romanizedInt, toKebabCase } from './utils'

export async function getAllTitles () {
  const pool = createPool()
  const result = await pool.query(
    'SELECT * FROM titles'
  )
  const html = pug.renderFile(path.join(__dirname, '../views/index.pug'), {titles: result.rows})
  return html
}

export async function getChaptersByTitle (title: string) {
  const pool = createPool()
  const result = await pool.query(
    'SELECT * FROM chapters WHERE title = $1 ORDER BY page', [title]
  )
  const html = pug.renderFile(path.join(__dirname, '../views/chapters.pug'), {title, chapters: result.rows})
  return html
}

export async function getAllCharacters() {
  const pool = createPool()
  const result = await pool.query(
    'SELECT * FROM characters'
  )
  const html = pug.renderFile(path.join(__dirname, '../views/characters.pug'), {characters: result.rows})
  return html
}

export async function getChaptersByCharacter(name: string) {
  const pool = createPool()
  const result = await pool.query(
    'SELECT * FROM chapters WHERE name = $1 ORDER BY page', [name]
  )
  const chaptersPerTitle = {}
  result.rows.forEach((row) => {
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
  const pool = createPool()
  try {
    const result = await pool.query(
      'DELETE FROM chapters WHERE page = $1 AND title = $2', [page, title]
    )
    return `Delete ${result.rowCount} row(s)`
  } catch (error) {
    return error
  }
}

export async function addChapter(name: string, page: number | string, title: string) {
  const pool = createPool()
  try {
    const temp = await pool.query(
      'SELECT * FROM chapters WHERE title = $1 AND name = $2', [title, name]
    )
    const characters = await pool.query(
      'SELECT * FROM characters where name = $1', [name]
    )
    const suffix = characters.rowCount > 0 ? romanizedInt(temp.rowCount) : null
    const result = await pool.query(
      'INSERT INTO chapters (id, name, suffix, page, title) values($1, $2, $3, $4, $5)', [randomUUID(), name, suffix, page, title]
    )
    return `Added ${result.rowCount} row(s)`
  } catch (error) {
    return error
  }
}

export async function updateSuffix(name: string, suffix: string) {
  const pool = createPool()
  try {
    const result = await pool.query(
      'UPDATE chapters SET suffix = $1 WHERE name = $2', [suffix, name]
    )
    return `Updated ${result.rowCount} row(s)`
  } catch (error) {
    return error
  }
}

export async function updateCharacter(oldName: string, newName: string) {
  const pool = createPool()
  try {
    const chapter = await pool.query(
      'UPDATE chapters SET name = $1 WHERE name = $2', [newName, oldName]
    )
    const character = await pool.query(
      'UPDATE characters SET name = $1 WHERE name = $2', [newName, oldName]
    )
    return `Updated ${character.rowCount} character in ${chapter.rowCount} chapter(s)`
  } catch (error) {
    return error
  }
}

export async function addTitle(name: string) {
  const pool = createPool()
  try {
    const result = await pool.query(
      'INSERT INTO titles (id, title, slug) values($1, $2, $3)', [randomUUID(), name, toKebabCase(name)]
    )
    return `Added ${result.rowCount} row(s)`
  } catch (error) {
    return error
  }
}

export async function deleteTitle(slug: string) {
  const pool = createPool()
  try {
    const result = await pool.query(
      'DELETE FROM titles WHERE slug = $1', [slug]
    )
  return `Delete ${result.rowCount} row(s)`
} catch (error) {
    return error
  }
}

export async function addCharacter(name: string) {
  const pool = createPool()
  try {
    const result = await pool.query(
      'INSERT INTO characters (id, name) values($1, $2)', [randomUUID(), name]
    )
    return `Added ${result.rowCount} row(s)`
  } catch (error) {
    return error
  }
}

export async function deleteCharacter(name: string) {
  const pool = createPool()
  try {
    const result = await pool.query(
      'DELETE FROM characters WHERE name = $1', [name]
    )
  return `Delete ${result.rowCount} row(s)`
} catch (error) {
    return error
  }
}

