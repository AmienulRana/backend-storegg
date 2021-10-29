const mongoose = require("mongoose");

const voucherSchema = mongoose.Schema({
  nameGame: { type: String, require: [true, "Nama game haru diisi"] },
  status: { type: String, enum: ["Y", "N"], default: "Y" },
  thumbnail: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  nominals: [{ type: mongoose.Schema.Types.ObjectId, ref: "nominal" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("voucher", voucherSchema);
