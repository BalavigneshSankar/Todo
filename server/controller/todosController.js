const catchAsync = require("../utils/catchAsync");
const User = require("../model/userModel");

exports.getUser = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.addTodo = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const todo = req.body;
  // Retrieve existing todos for the user
  const { todos } = await User.findById(userId).select("todos");
  // Add todo with the retrieved todos
  todos.push(todo);
  // Update todos for the user
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { todos },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});

exports.updateTodo = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const todoId = req.params.todoId;
  const updatedTodo = req.body;
  // Retrieve existing todos for the user
  const { todos } = await User.findById(userId).select("todos");
  // Update todo from the retrieved todos
  const updatedTodos = todos.map((t) => {
    if (t._id.toString() !== todoId) {
      return t;
    } else {
      t.value = updatedTodo.value;
      return t;
    }
  });
  // Update todos for the user
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { todos: updatedTodos },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const todoId = req.params.todoId;
  // Retrieve existing todos for the user
  const { todos } = await User.findById(userId).select("todos");
  // Delete todo from the retrieved todos
  const updatedTodos = todos.filter((t) => t._id.toString() !== todoId);
  // Update todos for the user
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { todos: updatedTodos },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});
