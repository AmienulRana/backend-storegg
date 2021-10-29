const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  tipePembayaran: { type: String, required: true },
  status: { type: String, enum: ["Y", "N"], default: "Y" },
  bank: [{ type: mongoose.Schema.Types.ObjectId, ref: "bank" }],
});

module.exports = mongoose.model("payment", paymentSchema);
