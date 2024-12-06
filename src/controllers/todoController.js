const Todo = require("../models/Todo")

exports.createTodo = async (req, res) => {
    try {
        const todo = new Todo({
            ...req.body,
            user: req.user._id
        });

        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({
            user: req.user._id
        }).sort({ createdAt: -1 });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true, runValidators: true }
        )

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json(todo)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        })

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" })
        }

        res.json({ message: "Todo deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}