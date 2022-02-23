const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('ToDo App');
})

app.get('/todos', (req, res) => {
  fs.readFile('./store/todos.json', 'utf-8', (err, data) => {
    if(err) {
      return res.status(500).send('Oops! Someting went wrong.');
    }
    const todos = JSON.parse(data);
    return res.json({todos: todos});
  })
})

app.get('/todos/incomplete', (req, res) => {
  const findIncompleteTodos = (todos) => {
    return todos.filter(todo => todo.complete !== true);
  }

  fs.readFile('./store/todos.json', 'utf-8', (err, data) => {
    if(err) {
      return res.status(500).send('Oops! Someting went wrong.');
    }
    let todos = JSON.parse(data);
    const incTodos = findIncompleteTodos(todos);
    return res.json(incTodos);
  })
})

app.post('/todo', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Bad request!');
  }

  const {name} = req.body;

  const addNewTodo = (todos, name, newId) => {
    const newTodos = [...todos, {
      id: newId,
      name,
      complete: false
    }]
    return newTodos;
  }

  fs.readFile('./store/todos.json', 'utf-8', (err, data) => {
    if(err) {
      return res.status(500).send('Oops! Someting went wrong.');
    }
    const todos = JSON.parse(data);
    const newId = Math.max.apply(Math, todos.map(t => t.id)) + 1;
    const newTodos = addNewTodo(todos, name, newId);
    fs.writeFile('./store/todos.json', JSON.stringify(newTodos), () => {
      return res.redirect('/todos');
    })
  })
})

app.put('/todos/:id/complete', (req, res) => {
  const {id} = req.params;

  const findTodoById = (todos, id) => {
    for(let i = 0; i < todos.length; i++) {
      if(todos[i].id === parseInt(id)) {
        return i;
      }
    }
    return -1;
  }

  fs.readFile('./store/todos.json', 'utf-8', (err, data) => {
    if(err) {
      return res.status(500).send('Oops! Someting went wrong.');
    }
    let todos = JSON.parse(data);
    const todoId = findTodoById(todos, id);

    if(todoId === -1) {
      return res.status(404).send('Not found');
    }

    todos[todoId].complete = true;

    fs.writeFile('./store/todos.json', JSON.stringify(todos), () => {
      return res.redirect('/todos');
    })
  })
})

app.listen(3000, () => {
  console.log(`SERVER LISTENING ON: http://localhost:3000`);
})