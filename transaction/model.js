const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  historyTopupVoucher: {
    namaGame: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String },
    coinName: { type: String, required: true },
    coinQuantity: { type: String, required: true },
    price: { type: Number },
  },
  historyPayment: {
    namaPemilik: { type: String, require: true },
    namaBank: { type: String, required: true },
    noRekening: { type: String, required: true },
    tipePembayaran: { type: String, required: true },
  },
  name: { type: String, require: true },
  accountUser: { type: String, required: true },
  tax: { type: Number, default: 0 },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "success", "failed"],
  },
  value: { type: Number, default: 0 },
  player: { type: mongoose.Schema.Types.ObjectId, ref: "player" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  historyUser: {
    name: { type: String, required: true },
    phoneNumber: { required: true, type: Number },
  },
});

module.exports = mongoose.model("transaction", transactionSchema);
