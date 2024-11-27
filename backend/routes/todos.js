const express = require('express');
const router = express.Router();
const Todo = require('../model/Todo');
const { ensureAuthenticated } = require('../config/auth');

// Get all todos for the current user
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new todo
router.post('/', ensureAuthenticated, async (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        user: req.user.id
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Toggle todo status
router.patch('/:id', ensureAuthenticated, async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        todo.done = !todo.done;
        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a todo
router.delete('/:id', ensureAuthenticated, async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        await todo.deleteOne();
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
