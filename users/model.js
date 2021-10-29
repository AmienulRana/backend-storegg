const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, enum: ["Y", "N"], default: "Y" },
  role: { type: String, enum: ["admin", "user"], default: "admin" },
  phoneNumber: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);
