import fs from 'fs/promises'
import pug from 'pug'
import path from 'path'
import { createPool } from './db'

export async function getAllTitles () {
  const data = await fs.readFile('data/titles.json')
  const titles = JSON.parse(Buffer.from(data).toString())
  const html = pug.renderFile(path.join(__dirname, '../views/index.pug'), {titles})
  return html
}

export async function getChaptersByTitle (title: string) {
  const data = await fs.readFile(`data/${title}.json`)
  const chapters = JSON.parse(Buffer.from(data).toString())
  const html = pug.renderFile(path.join(__dirname, '../views/chapters.pug'), {title, chapters})
  return html
}

export async function getAllCharacters() {
  const data = await fs.readFile('data/characters.json')
  const characters = JSON.parse(Buffer.from(data).toString())
  const html = pug.renderFile(path.join(__dirname, '../views/characters.pug'), {characters})
  return html
}

export async function getChaptersByCharacter(name: string) {
  const pool = createPool()
  const result = await pool.query(
    'SELECT * FROM chapters WHERE name = $1 ORDER BY page', [name],
  )
  const chaptersPerTitle = {}
  result.rows.forEach((row) => {
    if (chaptersPerTitle[row.title]) {
      chaptersPerTitle[row.title].push(row)
    } else {
      chaptersPerTitle[row.title] = [row]
    }
  })
  return chaptersPerTitle
}