const {
  getAuthToken,
  getSpreadSheet,
  getSpreadSheetValues
} = require('./googleSheetsService.js');

const spreadsheetId = '1wQVypefm946ch4XDp37uZ-wartW4V7ILdg-qYiDXUHM';

const parseNumber = stringNum => {
  if (!stringNum || stringNum.length === 0) {
    return 0;
  }

  return parseInt(stringNum, 10);
};

const parseDate = string => {
  const [date, time] = string.split('_');
  return `${date} ${time}`;
};

const getLatestSheet = async () => {
  try {
    const auth = await getAuthToken();
    const response = await getSpreadSheet({
      spreadsheetId,
      auth
    });
    return response.data.sheets[0];
  } catch (error) {
    console.log(error.message, error.stack);
  }
};

const getSheetValues = async sheetName => {
  try {
    const auth = await getAuthToken();
    const response = await getSpreadSheetValues({
      spreadsheetId,
      sheetName,
      auth
    });
    return response.data;
  } catch (error) {
    console.log(error.message, error.stack);
  }
};

const fetchData = async () => {
  const {
    properties: { sheetId, title }
  } = await getLatestSheet();
  const { values } = await getSheetValues(title);
  values.shift(); // Remove row with labels

  let data = values.reduce(
    (sum, value) => {
      // Columns: 'Province/State', 'Country/Region', 'Last Update', 'Confirmed', 'Deaths', 'Recovered'
      const [, , , confirmed, deaths, recovered] = value;
      return {
        confirmed: sum.confirmed + parseNumber(confirmed),
        deaths: sum.deaths + parseNumber(deaths),
        recovered: sum.recovered + parseNumber(recovered)
      };
    },
    { confirmed: 0, deaths: 0, recovered: 0 }
  );

  data = {
    ...data,
    updatedAt: parseDate(title),
  }
  return data;
};

module.exports = { fetchData };
