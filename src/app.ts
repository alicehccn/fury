import express from 'express'
import * as controller from './controllers'


const app = express()

app.get('/', (req, res) => {
  controller.getAllTitles(res)
})

app.get('/title/:title', (req, res) => {
  const title = req?.params.title
  controller.getChaptersByTitle(title, res)
})

app.get('/title/:title/:page', (req, res) => {
  const title = req?.params.title
  const page = req?.params.page
  controller.getChapterDetails(title, page, res)
})

app.get('/character/:name', (req, res) => {
  const character = req?.params.name
  controller.getChaptersByCharacter(character, res)
})

app.get('/location/:location', (req, res) => {
  const location = req?.params.location
  controller.getChaptersByLocation(location, res)
})

app.post('/chapter/new', (req, res) => {
  const {name, page, title} = req.query
  controller.addChapter(name as string, page as string, title as string, res)
})

app.post('/title/new', (req, res) => {
  const { name } = req.query
  controller.addTitle(name as string, res)
})

app.post('/character/new', (req, res) => {
  const { name, house } = req.query
  controller.addCharacter(name as string, house as string, res)
})

app.post('/role/new', (req, res) => {
  const { character, role } = req.query
  controller.addRole(character as string, role as string, res)
})

app.post('/house/new', (req, res) => {
  const { house, sigil, words } = req.query
  controller.addHouse(house as string, sigil as string, words as string, res)
})

app.listen(process.env.PORT, async() => {
  console.log(`app listening at port ${process.env.PORT}`)
})
