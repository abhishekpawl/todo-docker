const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('ToDo App');
})

app.listen(3000, () => {
  console.log(`SERVER LISTENING ON: http://localhost:3000`);
})