const request = require('request');
const neatCsv = require('neat-csv');
const SOURCES = require('./sources');

const makeRequest = (key) => {
  return new Promise((resolve, reject) => {
    request.get(SOURCES[key], async (error, response, body) => {
      if (error) return reject(error);
      try {
        const csv = await neatCsv(body);
        resolve(csv);
      } catch(e) {
        reject(e);
      }
    })
  })
}

const fetchData = () => {
  const promises = Object.keys(SOURCES).map(key => makeRequest(key));
  let updatedAt = new Date();
  return Promise
    .all(promises)
    .then(data => {
      const [confirmed, deaths, recovered] = data.map(d =>
        d.map(row => {
          updatedAt = new Date(Object.keys(row).slice(-1)[0]);
          return Number(Object.values(row).slice(-1)[0])
        }).reduce((sum, value) => sum + value)
      );
      return { confirmed, deaths, recovered, updatedAt };
  });
}

// fetchData().then(result => console.log(result));
module.exports = fetchData;
