const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/registrar", userController.registrar);
router.post("/login", userController.login);
router.get("/", userController.listar);
router.put("/:id", userController.actualizar);
router.delete("/:id", userController.eliminar);

module.exports = router;

