import { createPool } from './db'

export async function getAllTitles () {
  const pool = createPool()
  const result = await pool.query(
    'SELECT * FROM titles ORDER BY slug'
  ) 
  return result.rows
}

export async function getChaptersByTitle (title: string) {
  const pool = createPool()
  const result = await pool.query(
    'SELECT * FROM chapters WHERE title = $1 ORDER BY page', [title]
  ) 
  return result.rows
}

export async function getAllCharacters() {
  const pool = createPool()
  const result = await pool.query(
    'SELECT * FROM characters ORDER BY name'
  ) 
  return result.rows
}

export async function getChaptersByCharacter(name: string) {
  const pool = createPool()
  const result = await pool.query(
    'SELECT * FROM chapters WHERE name = $1 ORDER BY title', [name],
  ) 
  return result.rows
}