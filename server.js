const fs = require('fs');
const express = require('express');

const app = express();
const COLLECTION_PATH = './data/collection.json';
const diff = JSON.parse(fs.readFileSync('./data/diff.json'));

app.use(express.json({ limit: '50mb' }));

app.get('/collection', (req, res) => {
  const collection = JSON.parse(fs.readFileSync(COLLECTION_PATH));
  res.json(collection);
});

app.get('/diff', (req, res) => {
  res.json(diff);
});

app.post('/save', (req, res) => {
  fs.writeFileSync(COLLECTION_PATH, JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000.');
});
