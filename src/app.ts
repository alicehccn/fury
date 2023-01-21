import express from 'express'
import { createCharacters, createTables, createTitles } from './db'
import { getAllCharacters, getChaptersByCharacter, getChaptersByTitle, getAllTitles, updateChapterSuffix } from './controllers'

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

app.patch('/chapter', (req, res) => {
  const { chapterId, suffix }  = req.query
  updateChapterSuffix(chapterId as string, suffix as string, res)
})

app.listen(port, async() => {
  await createTables()
  await createTitles()
  await createCharacters()
  console.log(`app listening at localhost:${port}`)
})
