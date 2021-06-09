const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxlength: 50
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true
    },
    bio: {
      type: String,
      maxlength: 160
    },
    location: {
      type: String,
      maxlength: 30
    },
    website: {
      type: String,
      maxLength: 100
    },
    DOB: Date,
    profilePicture: String,
    coverPicture: String,
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Passwords do not match"
      }
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
