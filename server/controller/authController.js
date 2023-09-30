const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const { promisify } = require("util");
const AppError = require("../utils/AppError");

const signJWTToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signJWTToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      newUser,
    },
  });
});

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Provide email and password", 400));
  }

  // Check if the user exist, if so password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("Invalid email or password", 401));
  }

  const token = signJWTToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1. Check if there is a token
  let token;
  if (req.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Without header i.e in postman, token is undefined. with header "Bearer null" i.e in client, token is "null"
  if (!token || token === "null") {
    return next(new AppError("Log in to get access", 401));
  }

  // 2. Validate token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  // 3. Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    throw new AppError("The user belonging to this token does not exist", 401);
  }

  // Sending the user data to the next middleware / protected route
  req.user = currentUser;
  next();
});
