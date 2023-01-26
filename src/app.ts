import express from 'express'
import { createCharacters, createTables, createTitles } from './db'
import * as controller from './controllers'
import path from 'path'
import pug  from 'pug'

const app = express()
const port = 4000

app.get('/', (req, res) => {
  controller.getAllTitles(res)
})

app.get('/title/:title', (req, res) => {
  const title = req?.params.title
  controller.getChaptersByTitle(title, res)
})

app.get('/characters', (req, res) => {
  controller.getAllCharacters(res)
})

app.get('/character/:name', (req, res) => {
  const character = req?.params.name
  controller.getChaptersByCharacter(character, res)
})


app.post('/chapter', (req, res) => {
  const {name, page, title} = req.query
  controller.addChapter(name as string, page as string, title as string, res)
})

app.post('/title', (req, res) => {
  const { name } = req.query
  controller.addTitle(name as string, res)
})

app.post('/character', (req, res) => {
  const { name } = req.query
  controller.addCharacter(name as string, res)
})

app.delete('/title/:slug', (req, res) => {
  const slug = req?.params.slug
  controller.deleteTitle(slug, res)
})

app.delete('/chapter', (req, res) => {
  const { page, title } = req.query
  controller.deleteChapter(page as string, title as string, res)
})

app.delete('/character/:slug', (req, res) => {
  const slug = req?.params.slug
  controller.deleteCharacter(slug, res)
})

app.get('/test', (req, res) => {
  const html = pug.renderFile(path.join(__dirname, '../views/character.pug'))
  res.send(html)
})

app.listen(port, async() => {
  await createTables()
  await createTitles()
  await createCharacters()
  console.log(`app listening at localhost:${port}`)
})
