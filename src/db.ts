import { Pool } from 'pg'
import fs from 'fs/promises'
import { randomUUID } from 'crypto'
import { toKebabCase } from './utils'

export function createPool() {
  return new Pool({
    user: 'postgres',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
    host: '146.190.60.119',
  })
}
const pool = createPool()

export async function getCharactersByHouse(house: string) {
  try {
    const result = await pool.query(`
    SELECT DISTINCT chr.name, t.title, t.slug, t.volume
    FROM chapters chp
    INNER JOIN roles r
    ON chp.pov = r.role
    INNER JOIN characters chr
    ON chr.name = r.character
    INNER JOIN houses h
    ON h.lastname = chr.house
    INNER JOIN titles t
    ON t.slug = chp.title
    WHERE h.lastname = $1
    ORDER BY chr.name, t.volume
    `,[house]
    )
    return result
  } catch (error) {
    return error
  }
}

export async function getTitleBySlug(slug: string) {
  try {
    const result = await pool.query(
      'SELECT * FROM titles where slug = $1', [slug]
    )
    return result
  } catch (error) {
    return error
  }
}

export async function getAllTitles () {
  try {
    const result = await pool.query(
      'SELECT * FROM titles ORDER BY volume'
    )
    return result
  } catch (error) {
    return error
  }
}

export async function getAllChapters() {
  try {
    const result = await pool.query(
      'SELECT * FROM chapters'
    )
    return result
  } catch(error) {
    return error
  }
}

export async function getChaptersByTitle (title: string) {
  try {
    const result = await pool.query(`
      SELECT *
      FROM chapters chapter
      WHERE chapter.title = $1
      ORDER BY chapter.page`,
    [title]
    )
    return result
  } catch (error) {
    return error
  }
}

export async function getChaptersByCharacter(name: string) {
  try {
    const result = await pool.query(`
      SELECT chp.*
      FROM chapters chp
      where chp.pov = $1
      ORDER BY chp.page
    `,[name]
    )
    return result
  } catch (error) {
    return error
  }
}

export async function getAllCharacters() {
  try {
    const result = await pool.query(`
      SELECT ch.name, id.role
      FROM roles id 
      LEFT JOIN characters ch
      ON id.character = ch.name
      ORDER BY ch.name, id.role
    `)
    return result
  } catch (error) {
    return error
  }
}

export async function getCharacterByName(name: string) {
  try {
    const result = await pool.query(
      'SELECT * FROM characters WHERE name = $1', [name]
    )
    return result
  } catch (error) {
    return error
  }
}

export async function getAppearances(name: string, title: string) {
  try {
    const result = await pool.query(
      'SELECT * FROM chapters WHERE title = $1 AND name = $2', [title, name]
    )
    return result
  } catch (error) {
    return error
  }
}

export async function deleteChapter(page: string | number, title: string) {
  try {
    const result = await pool.query(
      'DELETE FROM chapters WHERE page = $1 AND title = $2', [page, title]
    )
    return result
  } catch (error) {
    return error
  }
}

export async function addTitle(name: string) {
  const result = await pool.query(
    'INSERT INTO titles (id, title, slug) values($1, $2, $3)', [randomUUID(), name, toKebabCase(name)]
  )
  return result
}

export async function addChapter(name: string, suffix: string, page: number | string, title: string) {
  try {
    const result = await pool.query(
      'INSERT INTO chapters (id, name, suffix, page, title) values($1, $2, $3, $4, $5)', [randomUUID(), name, suffix, page, title]
    )
    return result
  } catch (error) {
    return error
  }
}

export async function deleteTitle(slug: string) {
  try {
    const result = await pool.query(
      'DELETE FROM titles WHERE slug = $1', [slug]
    )
    return result
  } catch (error) {
    return error
  }
}

export async function addCharacter(name: string, house: string) {
  try {
    const result = await pool.query(
      'INSERT INTO characters (id, name, house) values($1, $2, $3)', [randomUUID(), name, house]
    )
    return result
  } catch (error) {
    return error
  }
}

export async function deleteCharacter(name: string) {
  try {
    const result = await pool.query(
      'DELETE FROM characters WHERE name = $1', [name]
    )
    return result
  } catch (error) {
    return error
  }
}


export async function addRole (name: string, role: string) {
  try {
    const result = await pool.query(
      'INSERT INTO roles (id, role, character) VALUES ($1, $2, $3)', [randomUUID(), role, name]
    )
    return result
  } catch (error) {
    return error
  }
}

export async function addHouse (house: string, sigil: string, words: string) {
  try {
    const result = await pool.query(
      'INSERT INTO houses (id, name, sigil, words) VALUES ($1, $2, $3, $4)', [randomUUID(), house, sigil, words]
    )
    return result
  } catch (error) {
    return error
  }
}
// Utils //

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
          pov VARCHAR(50),
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
          house VARCHAR(50),
        UNIQUE(name)
      )`
    )
    await pool.query(
      `CREATE TABLE IF NOT EXISTS
        roles (
          id VARCHAR(50) PRIMARY KEY,
          role VARCHAR(50),
          character VARCHAR(50),
        UNIQUE(role, character)
      )`
    )
    await pool.query(
      `CREATE TABLE IF NOT EXISTS
        houses (
          id VARCHAR(50) PRIMARY KEY,
          name VARCHAR(50),
          sigil VARCHAR(50),
          words VARCHAR(150),
        UNIQUE(name)
      )`
    )
  } catch (error) {
    console.log(error)
  }
}

//////////////
// OUTDATED //
//////////////
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
      // console.log(error.detail)
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
      // console.log(error.detail)
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
    try {
      await pool.query(
        'INSERT INTO characters (id, name) VALUES ($1, $2)', [randomUUID(), character]
      )
    } catch (error) {
      console.log(error)
    }
  })
}

export async function createRoles () {
  const characters = await getAllCharacters()
  characters.rows.map(async (character: Character) => {
    try {
      await pool.query(
        'INSERT INTO roles (id, role, character) VALUES ($1, $2, $3)', [randomUUID(), character.name, character.name]
      )
    } catch (error) {
      console.log(error)
    }
  })
}

export async function getAllHouses() {
  try {
    const result = await pool.query(`
      SELECT * from houses;
    `)
    return result
  } catch(error) {
    return error
  }
}

export async function getAllStuff() {
  try {
    const result = await pool.query(`
      SELECT h.lastname, h.sigil, h.words, ch.name as character, r.role
      FROM houses h
      LEFT OUTER JOIN characters ch
      ON h.lastname = ch.house
      LEFT OUTER JOIN roles r
      ON r.character = ch.name
    `)
    return result
  } catch(error) {
    return error
  }
}
