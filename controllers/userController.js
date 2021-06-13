const User = require("../models/User");

// Return object of the allowed fields
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ status: "success", data: { users } });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: "error", msg: err.message });
  }
};

// Get User
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ status: "success", data: { user } });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: "error", msg: err.message });
  }
};

// Update User(by himself)
exports.updateMe = async (req, res) => {
  const filteredBody = filterObj(
    req.body,
    "name",
    "email",
    "bio",
    "location",
    "website"
  );

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  return res.status(200).json({
    status: "success",
    data: {
      user: updatedUser
    }
  });
};

// Delete User(by himself)
exports.deleteMe = async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  res.status(204).json({
    status: "success",
    data: null
  });
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      res.status(400).json({
        status: "fail",
        msg: "You cannot update password using this route"
      });
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.status(201).json({ status: "success", data: { user } });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: "error", msg: err.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .status(204)
      .json({ status: "success", msg: "User successfully deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: "error", msg: err.message });
  }
};
