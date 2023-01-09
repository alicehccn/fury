import express from 'express';
import { readData } from './controllers';
const app = express();
const port = 4000;

app.get('/:title', (req, res) => {
  const title = req?.params?.title
  readData(title, res)
});

app.listen(port, () => {
  console.log('ACOK INDEX');
  return console.log(`app listening at localhost:${port}`);
});
