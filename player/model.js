const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const playerSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    username: {
      type: String,
      required: true,
      maxLength: [255, "panjang nama harus 3 - 225 karakter"],
      minLength: [3, "panjang nama harus 3 - 225 karakter"],
    },
    password: {
      type: String,
      required: true,
      maxLength: [255, "panjang password harus 3 - 225 karakter"],
      minLength: [3, "panjang password harus 3 - 225 karakter"],
    },
    status: { type: String, enum: ["Y", "N"], default: "Y" },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    avatar: { type: String },
    fileName: { type: String },
    phoneNumber: {
      type: String,
      required: true,
      maxLength: [13, "panjang no telepon harus 8 - 13 angka"],
      minLength: [8, "panjang password harus 8 - 13 angka"],
    },
    favorite: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  },
  { timestamps: true }
);
playerSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});
module.exports = mongoose.model("player", playerSchema);
