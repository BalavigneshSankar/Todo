const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide your name"],
    uppercase: true,
  },
  email: {
    type: String,
    required: [true, "Provide your email"],
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Provide a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Provide a password"],
    minlength: [8, "Password should be minimum 8 characters long"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Provide a confirm password"],
    validate: {
      validator: function (value) {
        return this.password === value;
      },
      message: "Password and confirm password must be the same",
    },
  },
  todos: [
    {
      cAt: {
        type: String,
        default: new Date().toLocaleDateString("en-GB"),
      },
      value: String,
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // Encrypting password
  this.password = await bcrypt.hash(this.password, 12);

  //   Delete confirm password
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.checkPassword = async function (
  enteredPassword,
  databasePassword
) {
  return await bcrypt.compare(enteredPassword, databasePassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
