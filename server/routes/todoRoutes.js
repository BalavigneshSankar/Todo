const express = require("express");
const authController = require("../controller/authController");
const todosController = require("../controller/todosController");

const router = express.Router();

router.route("/").get(authController.protect, todosController.getUser);
router.route("/").post(authController.protect, todosController.addTodo);
router
  .route("/:todoId")
  .patch(authController.protect, todosController.updateTodo);
router
  .route("/:todoId")
  .delete(authController.protect, todosController.deleteTodo);

module.exports = router;
