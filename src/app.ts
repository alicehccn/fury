import express from 'express'
import { getChaptersByCharacter, getChaptersByTitle } from './controllers'
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send({})
})

app.get('/chapters/:title', (req, res) => {
  const title = req?.params?.title
  getChaptersByTitle(title, res)
})

app.get('/character/:character', (req, res) => {
  const character = req?.params.character
  getChaptersByCharacter(character, res)
})

app.listen(port, () => {
  console.log(`app listening at localhost:${port}`)
})
