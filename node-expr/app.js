const express = require('express');
const app = express();

app.use(reqLog);

app.get('/', (req, res, next) => {
  if (req.query.error) throw new Error(req.query.error);
  res.status(200).send(' Hello from test express server');
  res.dummy = 'Just to see if the same response is passed';
  next();
});

app.use(resLog);
app.use(errLog);

// == Middleware functions
function reqLog(req, res, next) {
  console.log(`Req arrived with url: `, req.url);
  next();
}

function resLog(req, res, next) {
  console.log(`Res check code: `, res.statusCode); // WHY ON EARTG DO I SEE
  console.log(`Res check dummy: `, res.dummy);
  next();
}

function errLog(err, req, res, next) {
  console.error(err);
  res.status(500).end(err);
}

app.listen(5000, () => {
  console.log(`App listening on http://localhost:5000`);
});
