import { createPool } from './db'


export async function getChaptersByTitle (title: string) {
  const pool = createPool()
  const result = await pool.query(
    'SELECT * FROM chapters WHERE title = $1', [title]
  ) 
  return result.rows
}

export async function getChaptersByCharacter(name: string) {
  const pool = createPool()
  const result = await pool.query(
    'SELECT * FROM characters WHERE name = $1', [name],
  ) 
  return result.rows
}