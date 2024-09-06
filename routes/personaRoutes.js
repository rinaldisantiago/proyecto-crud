const express = require("express");
const router = express.Router(); //*Importamos una utilidad de express llamada Router, permitiendo definir estas rutas
const personaController = require("../controllers/personaController");

//*Cada uno de los get y post sus controladores se encuentran en la carpeta controllers (linea 3)
router.get("/", personaController.home);
router.get("/list", personaController.list);
router.post("/create", personaController.create);
router.get("/info/:id", personaController.findById);
router.put("/update/:id", personaController.update);
router.get("/search", personaController.buscarPorNombre);
router.delete("/delete/:id", personaController.deletePersona);

module.exports = router; //*El module.exports hace que podamos exportar la constante router