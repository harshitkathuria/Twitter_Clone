const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxlength: 50
    },
    username: {
      type: String,
      required: [true, "UserName is required"],
      unique: true
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
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
  },
  {
    timestamps: true
  }
);

// Encrypt Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

// Compare Password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  password
) {
  return await bcrypt.compare(candidatePassword, password);
};

//Create Reset Password Token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

// Check if the pass
userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = this.passwordChangedAt.getTime() / 1000;
    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
