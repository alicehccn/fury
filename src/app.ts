import express from 'express';
import path from 'path';
import { getChapters } from './controllers';
const app = express();
const port = 4000;

app.set('views', path.join(__dirname, '../views/index.pug'));
app.set('view engine', 'pug')

app.get('/:title', (req, res) => {
  const title = req?.params?.title
  getChapters(title, res)
});

app.listen(port, () => {
  console.log(`app listening at localhost:${port}`);
});
