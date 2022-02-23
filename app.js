const express = require('express');

const app = express();

const todosRoutes = require('./routes/todos');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/todos', todosRoutes);

app.get('/', (req, res) => {
  res.send('ToDo App');
})

app.listen(3000, () => {
  console.log(`SERVER LISTENING ON: http://localhost:3000`);
})