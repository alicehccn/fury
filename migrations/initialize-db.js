
function createPool() {
  const Pool = require('pg').Pool
  return new Pool({
      user: 'alicehuang',
      database: 'fury',
      password: 'nebula',
      port: 5432,
      host: 'localhost',
    })
}

async function createTitles (slug) {
  const pool = createPool()
  const chapters = require(`../data/${slug}.json`)
  chapters.map(async (chapter) => {
    const result = await pool.query(
      'INSERT INTO chapters (name, suffix, page, title) VALUES ($1, $2, $3, $4)', [chapter.name, chapter.suffix, chapter.page, slug]
    ) 
  })
}
const slug = process.env.SLUG
createTitles(slug)

module.exports = {
  createTitles
}
