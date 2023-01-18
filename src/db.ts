import { Pool } from 'pg'

export function createPool() {
  return new Pool({
    user: 'postgres',
    database: 'fury',
    password: 'postgres',
    port: 5432,
    host: '146.190.60.119',
  })
}
