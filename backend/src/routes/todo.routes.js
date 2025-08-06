const express = require("express");
const TodoModel = require("../models/todo.model");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// To display or get all todos.
router.get("/", protect, async (req, res) => {
  try {
    const todos = await TodoModel.find({ user: req.user._id });
    res.json({ todos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// To add new todo.
router.post("/add", protect, async (req, res) => {
  try {
    const { task } = req.body;

    const todo = await TodoModel.create({
      task,
      user: req.user._id,
    });

    res.status(201).json({ message: "Todo added successfully", todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// To delete todo.
router.delete("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await TodoModel.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// To update todo.
router.patch("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { task, done } = req.body;

    const updatedTodo = await TodoModel.findOneAndUpdate(
      {
        _id: id,
        user: req.user._id,
      },
      { task, done },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo updated successfully", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
