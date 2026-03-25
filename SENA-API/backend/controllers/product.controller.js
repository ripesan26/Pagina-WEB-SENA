const Product = require("../models/product");

exports.listar = async (req, res) => {
  const data = await Product.find();
  res.json(data);
};

exports.crear = async (req, res) => {
  try {
    const { nombre, tipo, precio } = req.body;

    const nuevo = new Product({
      nombre,
      tipo,
      precio: Number(precio),
    });

    await nuevo.save();
    res.json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.actualizar = async (req, res) => {
  const data = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(data);
};

exports.eliminar = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Eliminado" });
};