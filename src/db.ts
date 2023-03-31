import { Pool } from 'pg'
import fs from 'fs/promises'
import { randomUUID } from 'crypto'
import { toKebabCase } from './utils'
import { config } from 'dotenv'
config()

export function createPool() {
  return new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: +process.env.DB_PORT || 5432,
    host: process.env.HOST || 'localhost',
  })
}
const pool = createPool()
export async function getCharactersByHouse(house: string) {
  try {
    const result = await pool.query(`
      SELECT DISTINCT chr.name, t.title, t.slug, t.volume, h.words
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
      SELECT chp.pov, chp.suffix, chp.headline, chp.location, chp.page, chp.chapter, chp.title, r.character
      FROM chapters chp
      LEFT JOIN roles r
      ON r.role = chp.pov
      WHERE chp.title = $1
      ORDER BY chp.page
      `, [title]
    )
    return result
  } catch (error) {
    return error
  }
}

export async function getChapterDetails(title: string, chapter: string) {
  try {
    const result = await pool.query(`
      SELECT chp.pov, chp.suffix, chp.headline, chp.location, chp.page, chp.title, chp.chapter, r.character, m.img, l.continent
      FROM chapters chp
      LEFT JOIN roles r
      ON r.role = chp.pov
      LEFT JOIN media m
      ON m.chapter = chp.id
      LEFT JOIN lands l
      ON l.land = chp.location
      WHERE chp.title = $1
      AND chp.chapter = $2
      `, [title, chapter]
    )
    return result
  } catch(error) {
    return error
  }
}

export async function getTitleSummary() {
  try {
    const result = await pool.query(`
      SELECT t.title, t.slug, r.character, COUNT(chp) count, t.volume
      FROM roles r
      LEFT OUTER JOIN chapters chp
      ON chp.pov = r.role
      RIGHT OUTER JOIN titles t
      ON t.slug = chp.title
      GROUP by t.volume, t.title, t.slug, r.character
      ORDER BY t.volume, t.title, count desc
    `)
    return result
  } catch (error) {
    return error
  }
}

export async function getChaptersByCharacter(name: string) {
  try {
    const result = await pool.query(`
      SELECT r.character, chp.pov, chp.suffix, chp.headline, chp.location, chp.page, chp.title as slug, t.title, t.volume, m.url
      FROM chapters chp
      INNER JOIN roles r
      ON chp.pov = r.role
      INNER JOIN titles t
      ON t.slug = chp.title
      LEFT JOIN media m
      ON m.chapter = chp.id
      WHERE r.character = $1
      ORDER BY t.volume, chp.page
    `,[name]
    )
    return result
  } catch (error) {
    return error
  }
}

export async function getChaptersByLocation(location: string) {
  try {
    const result = await pool.query(`
      SELECT l.land, l.continent, chp.pov, chp.suffix, chp.headline, chp.page, chp.title as slug, t.volume, t.title
      FROM chapters chp
      INNER JOIN roles r
      ON chp.pov = r.role
      INNER JOIN titles t
      ON t.slug = chp.title
      LEFT JOIN lands l
      ON l.land = chp.location
      where l.land = $1
      ORDER BY t.volume, chp.page
    `,[location]
    )
    return result
  } catch (error) {
    return error
  }
}

export async function getCharactesByLocation(location: string) {
  try {
    const result = await pool.query(`
    select distinct(r.character) from lands l
    left join chapters c
    on c.location = l.land
    inner join roles r 
    on r.role = c.pov
    where c.location = $1
    order by r.character
    `,[location]
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

export async function getCharacterSummaries() {
  try {
    const result = await pool.query(`
      SELECT
        r.character,
        chr.alias,
        chr.house,
        count(chp.id) AS count,
        RANK() OVER(ORDER BY count(chp.id) DESC) rank
      FROM chapters chp
      INNER JOIN roles r
      ON r.role = chp.pov
      LEFT OUTER JOIN characters chr
      ON chr.name = r.character
      GROUP BY r.character, chr.alias, chr.house
      ORDER BY count DESC
    `)
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
      'INSERT INTO chapters (id, pov, suffix, page, title) values($1, $2, $3, $4, $5)', [randomUUID(), name, suffix, page, title]
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
      'INSERT INTO houses (id, lastname, sigil, words) VALUES ($1, $2, $3, $4)', [randomUUID(), house, sigil, words]
    )
    return result
  } catch (error) {
    return error
  }
}


export async function getAllHouses() {
  try {
    const result = await pool.query(`
      SELECT DISTINCT h.lastname, h.sigil, h.words
      FROM houses h
      INNER JOIN characters chr
      ON chr.house = h.lastname
    `)
    return result
  } catch(error) {
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
    await pool.query(
      `CREATE TABLE IF NOT EXISTS
        media (
          id VARCHAR(50) PRIMARY KEY,
          url VARCHAR(50),
          chapter VARCHAR(50),
        UNIQUE(url, chapter)
      )`
    )
    await pool.query(
      `CREATE TABLE IF NOT EXISTS
        lands (
          id VARCHAR(50) PRIMARY KEY,
          land VARCHAR(50),
          continent VARCHAR(50),
        UNIQUE(land, continent)
      )`
    )
    await pool.query(
      `CREATE TABLE IF NOT EXISTS
        castles (
          id VARCHAR(50) PRIMARY KEY,
          castle VARCHAR(50),
          land VARCHAR(50),
        UNIQUE(land, castle)
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
