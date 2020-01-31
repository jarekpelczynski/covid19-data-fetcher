## About
App fetch latest data about Coronavirus from [Novel Coronavirus (2019-nCoV) Cases sheet](https://docs.google.com/spreadsheets/d/1yZv9w9zRKwrGTaR-YzmAqMefw4wMlaXocejdxZaTs6w/htmlview?usp=sharing&sle=true#) provided by JHU CSSE, and exposes it as JSON.

## How to

- [Enable Google Sheets API](https://developers.google.com/sheets/api/quickstart/js) for your Google account
- [Create Service Account credentials](https://console.developers.google.com/apis/credentials?project=reed-sheet) and download to app folder as credentials.json
- Run an app: `GOOGLE_APPLICATION_CREDENTIALS=credentials.json npm start`
- Docker: WIP

## Run

- Copy `credentials.json` to `config/` directory
- `docker-compose build`
- `docker-compose up`

```
$ curl localhost:8080
{"confirmed":9776,"deaths":213,"recovered":187,"updatedAt":"Jan30 930pm"}%
```
