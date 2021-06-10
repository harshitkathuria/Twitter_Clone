const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

// Encrypt Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

// Compare Password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  password
) {
  return await bcrypt.compare(candidatePassword, password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
