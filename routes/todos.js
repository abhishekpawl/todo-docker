const express = require('express');
const router = express.Router();

const todosController = require('../controllers/todos');

router.route('/')
  .get(todosController.getTodos)
  .post(todosController.addTodo)

router.get('/incomplete', todosController.getIncompleteTodos)

router.put('/:id/complete', todosController.completeTodo)

module.exports = router;