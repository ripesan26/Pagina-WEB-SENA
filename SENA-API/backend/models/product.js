const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  nombre: String,
  tipo: String,
  precio: Number,
});

module.exports = mongoose.model("Product", ProductSchema);