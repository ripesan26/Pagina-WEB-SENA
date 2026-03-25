const mongoose = require("mongoose");

const EmpleadoSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  cargo: String,
  salario: Number,
});

module.exports = mongoose.model("Empleado", EmpleadoSchema);