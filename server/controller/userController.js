const catchAsync = require("../utils/catchAsync");
const User = require("../model/userModel");

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user).select("name");

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
