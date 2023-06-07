const mongoose = require("mongoose");
const ROLES = require("../references/role.reference");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 50,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      min: 6,
      max: 255,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 8,
    },
    profileImage: {
      type: String,
      default: "default.png",
    },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
