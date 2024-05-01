const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter  name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: [true, "email already exist"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    trim: true,
  },

  mobile: {
    type: String,
    required: [true, "Please provide mobile"],
    unique: [true, "password already exist"],
    trim: true,
  },

  role: {
    type: String,
    default: "admin"
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
adminSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

adminSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
adminSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("Admin", adminSchema);
