const express = require("express");
const router = express.Router(); //*Importamos una utilidad de express llamada Router, permitiendo definir estas rutas

router.get("/", (req, res) => {
    res.status(200).send("Ruta principal de personas"); /* Se establece primero el codigo de estado de http (res.status) donde el 200 representa una respuesta satisfactoria.
    Seguido del comentario anterior, el .send manda el mensaje que dice "Ruta principal de personas" */
})

module.exports = router; //*El module.exports hace que podamos exportar la constante router