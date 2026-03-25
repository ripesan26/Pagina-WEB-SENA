const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/empleado.controller");

router.get("/", ctrl.listar);
router.post("/", ctrl.crear);
router.put("/:id", ctrl.actualizar);
router.delete("/:id", ctrl.eliminar);

module.exports = router;