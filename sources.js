const SOURCE_PREFIX = 'https://raw.githubusercontent.com/CSSEGISandData/2019-nCoV/master/time_series';
const SOURCES = {
  CONFIRMED: `${SOURCE_PREFIX}/time_series_2019-ncov-Confirmed.csv`,
  DEATHS: `${SOURCE_PREFIX}/time_series_2019-ncov-Deaths.csv`,
  RECOVERED: `${SOURCE_PREFIX}/time_series_2019-ncov-Recovered.csv`,
}

module.exports = SOURCES;
