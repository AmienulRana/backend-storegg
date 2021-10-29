const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  nama: { type: String, required: true },
});

module.exports = mongoose.model("category", categorySchema);
