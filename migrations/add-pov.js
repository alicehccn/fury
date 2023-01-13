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

async function createCharacters (name) {
  const pool = createPool()
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
    const result = await pool.query(
      'INSERT INTO characters (name) VALUES ($1)', [character]
    ) 
  })
}
const name = process.env.NAME
createCharacters(name)

module.exports = {
  createCharacters
}
