import express from 'express';
import { getChapters } from './controllers';
const app = express();
const port = 4000;

app.get('/:title', (req, res) => {
  const title = req?.params?.title
  getChapters(title, res)
});

app.listen(port, () => {
  console.log(`app listening at localhost:${port}`);
});
