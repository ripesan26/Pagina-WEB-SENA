const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registrar = async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;

        const existe = await User.findOne({ correo });
        if (existe) return res.status(400).json({ msg: "El correo ya existe" });

        const hash = await bcrypt.hash(password, 10);

        const usuario = new User({ nombre, correo, password: hash });
        await usuario.save();

        res.json({ msg: "Usuario registrado correctamente" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { correo, password } = req.body;

        const usuario = await User.findOne({ correo });
        if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });

        const valido = await bcrypt.compare(password, usuario.password);
        if (!valido) return res.status(400).json({ msg: "Contraseña incorrecta" });

        const token = jwt.sign(
            { id: usuario._id },
            "CLAVE_SECRETA",
            { expiresIn: "1d" }
        );

        res.json({ 
            message: "Login Exitoso.",
            token,
            usuario:{
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
            }
         });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.listar = async (req, res) => {
    const usuarios = await User.find();
    res.json(usuarios);
};

exports.actualizar = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.json({ msg: "Usuario actualizado" });
};

exports.eliminar = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "Usuario eliminado" });
};
