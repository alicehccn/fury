import { Pool } from 'pg'
import fs from 'fs/promises'
import { randomUUID } from 'crypto'

export function createPool() {
  return new Pool({
    user: 'postgres',
    database: 'fury',
    password: 'postgres',
    port: 5432,
    host: '192.168.0.108',
  })
}
const pool = createPool()


export async function createTables () {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS
        titles (
          id VARCHAR(50) PRIMARY KEY,
          title VARCHAR(50),
          slug VARCHAR(50),
        UNIQUE(slug)
      )`
    )
    await pool.query(
      `CREATE TABLE IF NOT EXISTS
        chapters (
          id VARCHAR(50) PRIMARY KEY,
          name VARCHAR(50),
          suffix VARCHAR(50),
          page INT,
          title VARCHAR(50),
        UNIQUE(page, title)
      )`
    )
    await pool.query(
      `CREATE TABLE IF NOT EXISTS
        characters (
          id VARCHAR(50) PRIMARY KEY,
          name VARCHAR(50),
        UNIQUE(name)
      )`
    )
  } catch (error) {
    console.log(error)
  }
}

export async function createTitles () {
  const data = await fs.readFile('data/titles.json')
  const titles = JSON.parse(Buffer.from(data).toString())
  titles.forEach(async (t: Title) => {
    try {
      await pool.query(
        'INSERT INTO titles (id, title, slug) VALUES ($1, $2, $3)', [randomUUID(), t.title, t.slug]
      )
      createChapters(t.slug)
    } catch(error) {
      console.log(error)
    }
  })
}

export async function createChapters (slug: string) {
  const data = await fs.readFile(`data/${slug}.json`)
  const chapters = JSON.parse(Buffer.from(data).toString())
  
  chapters.map(async (chapter: Chapter) => {
    try {
      await pool.query(
        'INSERT INTO chapters (id, name, suffix, page, title) VALUES ($1, $2, $3, $4, $5)', [randomUUID(), chapter.name, chapter.suffix, chapter.page, slug]
      ) 
    } catch (error) {
      console.log(error)
    }
  })
}

export async function createCharacters () {
  const characters = [
    'Arya',
    'Sansa',
    'Tyrion',
    'Bran',
    'Jaime',
    'Jon',
    'Catelyn',
    'Davos',
    'Theon',
    'Daenerys',
    'Samwell',
  ]
  characters.map(async (character) => {
    await pool.query(
      'INSERT INTO characters (name) VALUES ($1)', [character]
    ) 
  })
}
