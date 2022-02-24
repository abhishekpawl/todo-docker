const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
var methodOverride = require('method-override');

const app = express();

const todosRoutes = require('./routes/todos');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/todos', todosRoutes);

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.send('ToDo App');
})

app.listen(3000, () => {
  console.log(`SERVER LISTENING ON: http://localhost:3000`);
})