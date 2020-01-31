const express = require('express');
const { fetchData } = require('./src/fetchData');

const app = express();
const PORT = 8080;
const HOST = '0.0.0.0';

const main = async () => {
  const data = await fetchData();

  app.get('/', (req, res) => res.json(data));
  app.listen(PORT, HOST);
  console.log(`Running on http://${HOST}:${PORT}`);
};

main();
