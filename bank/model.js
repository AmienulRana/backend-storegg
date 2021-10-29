const mongoose = require("mongoose");

const bankSchema = mongoose.Schema({
  namaPemilik: { type: String, required: true },
  namaBank: { type: String, required: true },
  noRekening: { type: String, required: true },
});

module.exports = mongoose.model("bank", bankSchema);
