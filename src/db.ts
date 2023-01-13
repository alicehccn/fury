import { Pool } from 'pg'

export function createPool() {
  return new Pool({
    user: 'alicehuang',
    database: 'fury',
    password: 'nebula',
    port: 4000,
    host: 'localhost',
  })
}