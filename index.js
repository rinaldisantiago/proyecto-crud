const express = require("express");
const bodyParser = require("body-parser");
const personaRouter = require("./routes/personaRoutes");

const app = express();

app.use(bodyParser.json()); //*Todas las respuestas de la aplicacion sean formateadas automaticamente en json
app.use("/api/personas", personaRouter);

app.listen(3000, () => {
    console.log("Aplicacion corriendo en puerto 3000");
})