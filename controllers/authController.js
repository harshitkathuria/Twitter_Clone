const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");

const User = require("../models/User");
const Email = require("../utils/email");

const signToken = id => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  return token;
};

// Signup
exports.signup = async (req, res, next) => {
  try {
    // Validate email and date
    if (!validator.isEmail(req.body.email))
      return res.status(400).json({
        status: "fail",
        msg: "Please correct email address"
      });
    if (!validator.isDate(req.body.DOB))
      return res.status(400).json({
        status: "fail",
        msg: "Please correct Date of Birth"
      });

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      DOB: req.body.DOB,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
    });

    await new Email(newUser).sendWelcome();

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
      return res.status(400).json({
        status: "fail",
        msg: "Please provide both email and password"
      });
    }
    // Confirm email and password
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
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

// Forget Password
exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
      msg: "fail",
      msg: "No user exists with this e-mail"
    });
  }

  //Generate reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    // Send it to user's e-mail
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/users/resetPassword/${resetToken}`;
    await new Email(user).sendPasswordReset(resetURL);

    res.status(200).json({
      stataus: "success",
      message: "Token sent to email!"
    });
  } catch (err) {
    console.log(err);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(500).json({
      status: "fail",
      msg: "There was an error sending the email"
    });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    //Get user from the reset token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    // Token Error
    if (!user) {
      return res.status(400).json({
        status: "fail",
        msg: "Token is invalid or expired"
      });
    }
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const token = signToken();
    res.status(201).json({
      status: "success",
      token,
      data: {
        user
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: "fail",
      msg: err.message
    });
  }
};
