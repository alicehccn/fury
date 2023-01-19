import express from 'express'
import { createTables } from './db'

import { getAllCharacters, getChaptersByCharacter, getChaptersByTitle, getAllTitles } from './controllers'
const app = express()
const port = 4000

app.get('/', (req, res) => {
  getAllTitles(res)
})

app.get('/:title', (req, res) => {
  const title = req?.params?.title
  getChaptersByTitle(title, res)
})

app.get('/characters', (req, res) => {
  getAllCharacters(res)
})

app.get('/character/:character', (req, res) => {
  const character = req?.params.character
  getChaptersByCharacter(character, res)
})

app.listen(port, async() => {
  createTables()

  console.log(`app listening at localhost:${port}`)
})
