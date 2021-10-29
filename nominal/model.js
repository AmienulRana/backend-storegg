const mongoose = require("mongoose");

const nominalSchema = mongoose.Schema({
  coinQuantity: { type: Number, default: 0 },
  coinName: { type: String, required: [true, ["nama koin harus diisi"]] },
  harga: { type: Number, required: true },
});

module.exports = mongoose.model("nominal", nominalSchema);
