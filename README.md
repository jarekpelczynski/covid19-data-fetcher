## About
App fetch latest data about Coronavirus from [2019 Novel Coronavirus (nCoV) Data Repository](https://github.com/CSSEGISandData/2019-nCoV), and exposes it as JSON.

## Run
- `docker-compose build`
- `docker-compose up`

```
$ curl localhost:8080
{"confirmed":40536,"deaths":910,"recovered":3312,"updatedAt":"2020-02-09T22:20:00.000Z"}
```
