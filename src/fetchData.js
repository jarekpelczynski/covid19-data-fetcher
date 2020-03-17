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
      // Get only data from confirmed
      const countries = data[0].map(row => {
        const cols = Object.values(row);
        return {
          country: cols[1],
          region: cols[0],
          confirmed: Number(cols.slice(-1)),
          change: Number(cols.slice(-2).reduce((acc, value) => (value - acc)))
        }
      })
      return { confirmed, deaths, recovered, updatedAt, countries };
  });
}

// fetchData().then(result => console.log(result));
module.exports = fetchData;
