const mongoose = require("mongoose");
// Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "username is required"],
    },
    location: {
      type: String,
      required: [true, "location is required"],
    },
    email: {
      type: String,
      required: [true, "Email id is required"],
      //   unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    address: {
      type: String,
    },
    date: {
      type: Date,
      required: [true, "Date  is required"],
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Export
module.exports = mongoose.model("User", userSchema);
