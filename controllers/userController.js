const User = require("../models/User");
const multer = require("multer");
const sharp = require("sharp");

//image stored in buffer
const multerStorage = multer.memoryStorage();

// Multer filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    console.log("no");
    cb(null, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserImages = upload.fields([
  { name: "profilePicture", max: 1 },
  { name: "coverPicture", max: 1 }
]);

//Resize user photo
exports.resizeUserImages = async (req, res, next) => {
  try {
    // console.log(req.files.profilePicture, req.files.coverPicture);
    if (!req.files.profilePicture && !req.files.coverPicture) return next();

    //1) profilePicture
    if (req.files.profilePicture) {
      req.body.profilePicture = `user-profile-${
        req.user.id
      }-${Date.now()}.jpeg`;
      await sharp(req.files.profilePicture[0].buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        //90 % quality
        .jpeg({ quality: 90 })
        .toFile(`./client/src/assets/users/${req.body.profilePicture}`);
    }

    //1) coverPicture
    if (req.files.coverPicture) {
      req.body.coverPicture = `user-cover-${req.user.id}-${Date.now()}.jpeg`;
      await sharp(req.files.coverPicture[0].buffer)
        .resize(1000, 1000)
        .toFormat("jpeg")
        //90 % quality
        .jpeg({ quality: 90 })
        .toFile(`./client/src/assets/users/${req.body.coverPicture}`);
    }

    next();
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: "error", msg: err.message });
  }
};

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
    "website",
    "profilePicture",
    "coverPicture"
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
