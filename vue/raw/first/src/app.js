const express = require('express');
const app = express();

const path = require('path');
const PORT = process.env.PORT || 3000;
app.use('/', express.static(path.resolve(__dirname, './static')));

app.listen(PORT, () => {
  console.log(`APP listening on http://localhost:${PORT}`);
});
