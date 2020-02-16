const SOURCE_PREFIX = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/';
const SOURCES = {
  CONFIRMED: `${SOURCE_PREFIX}/time_series_19-covid-Confirmed.csv`,
  DEATHS: `${SOURCE_PREFIX}/time_series_19-covid-Deaths.csv`,
  RECOVERED: `${SOURCE_PREFIX}/time_series_19-covid-Recovered.csv`,
}

module.exports = SOURCES;
