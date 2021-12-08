require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const { queryParser } = require('express-query-parser');
const { time } = require('console');
const router = express.Router();

app.use('/', express.static(path.resolve(__dirname, './public')));
app.use(express.json());
app.use(
  queryParser({
    parseNull: true,
    parseBoolean: true,
    parseNumber: true
  })
);

app.post('/checkout', (req, res, next) => {
  console.log(`body `, req.body);
  console.log(`query `, req.query);
  res.json(req.query);
  return next();
});

app.get('/', (req, res, next) => {
  const uid = new Date().getTime().toString();
  let url =
    `https://demo.epay.bg/xdev/mobile/api/start?` +
    `APPID=${process.env.APP_ID}` +
    `&DEVICEID=${process.env.DEVICEID}` +
    `&KEY=${uid}` +
    `&DEVICE_NAME=myphone&BRAND=iPhone&OS=iOS&MODEL=iPhone5s&OS_VERSION=8.0&PHONE=1`;

  res.send(`<div><a href="${url}"><h2>Autorize</h2></a><h2>${uid}</h2><div>`);
});

app.listen(3333, () => {
  console.log(`app is listening http://localhost:3333`);
  console.log(`APP_ID`, `=`, process.env.APP_ID);
  console.log(`RCPT`, process.env.RCPT);
  console.log(`API_BASE_WEB`, `=`, process.env.API_BASE_WEB);
  console.log(`DEVICEID`, `=`, process.env.DEVICEID);
  console.log(`TOKEN`, `=`, process.env.TOKEN);
});
