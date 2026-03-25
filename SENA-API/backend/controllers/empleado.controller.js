const Empleado = require("../models/empleado");

exports.listar = async (req, res) => {
  const data = await Empleado.find();
  res.json(data);
};

exports.crear = async (req, res) => {
  try {
    const { nombre, correo, cargo, salario } = req.body;

    const nuevo = new Empleado({
      nombre,
      correo,
      cargo,
      salario: Number(salario),
    });

    await nuevo.save();
    res.json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.actualizar = async (req, res) => {
  const data = await Empleado.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(data);
};

exports.eliminar = async (req, res) => {
  await Empleado.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Eliminado" });
};