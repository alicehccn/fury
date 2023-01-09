import express from 'express';
import readData from './reader';
const app = express();
const port = 4000;

app.get('/:bookNumber', (req, res) => {
  res.send(req?.params?.bookNumber);
});

app.listen(port, () => {
  console.log('ACOK INDEX');
  readData()
  return console.log(`Express is listening at http://localhost:${port}`);
});
