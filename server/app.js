const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const todoRouter = require("./routes/todoRoutes");
const globalErrorHandler = require("./controller/errorController");
const AppError = require("./utils/AppError");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", todoRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot access ${req.originalUrl} in this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
