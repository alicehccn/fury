import pug from 'pug'
import path from 'path'
import { createPool } from './db'

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
    'SELECT * FROM chapters WHERE title = $1', [title]
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

export async function updateChapterSuffix(id: string, suffix: string) {
  const pool = createPool()
  const result = await pool.query(
    'UPDATE chapters SET suffix = $1 WHERE id = $2', [suffix, id]
  )
  return result
}