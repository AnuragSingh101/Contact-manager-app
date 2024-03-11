const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Register a user
// @route post /api/users
// @access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mindatory!");
  }
  const userAvilable = await User.findOne({ email });
  if (userAvilable) {
    res.status(400);
    throw new Error("User is already registerd!");
  }

  // hashpassword ---
  const hasedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hasedPassword,
  });
  if (user) {
    res.status(200).json({ _id: user._id, email: user.email });
  } else {
    res.status(400).json({ msg: "User data does not valid" });
  }
  console.log(`Hasspassword is ${hasedPassword}`);
  res.json({ msg: "Register The user " });
});

//@desc Login user
// @route post /api/users
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("All fields are mindatory!");
  }
  const user = await User.findOne({ email });
  // compare password with hasedpassword

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          _id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401).json({ msg: "email or password is not valid " });
  }
  res.json({ msg: "login  user " });
});

//@desc current user info
// @route post /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
