const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = id => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  return token;
};

// Signup
exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
    });

    const token = signToken();
    res.status(201).json({
      status: "success",
      token,
      data: {
        newUser
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err.message
    });
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        status: "fail",
        msg: "Please provide both email and password"
      });
    }
    // Confirm email and password
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      res.status(401).json({
        status: "fail",
        msg: "Incorrect email or password"
      });
    }
    const token = signToken();
    res.status(200).json({
      status: "success",
      token,
      data: {
        user
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err.message
    });
  }
};
