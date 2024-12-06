const express = require("express")
const router = express.Router()
const {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
} = require("../controllers/todoController")
const authMiddleware = require("../middleware/authMiddleware")
const { validateTodoCreate, validateTodoUpdate } = require("../middleware/validationMiddleware")

router.use(authMiddleware)

router.post('/', validateTodoCreate, createTodo)
router.get('/', getTodos)
router.patch('/:id', validateTodoUpdate, updateTodo)
router.delete("/:id", deleteTodo)

module.exports = router;