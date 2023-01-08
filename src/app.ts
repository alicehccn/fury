import express from 'express';
const app = express();
const port = 4000;

app.get('/', (req, res) => {
  console.log('ACOK INDEX');
  res.send('Hello World!');
  
});

app.listen(port, () => {
  console.log('ACOK INDEX');

  return console.log(`Express is listening at http://localhost:${port}`);
});
