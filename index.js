const express = require("express");
const bodyParser = require("body-parser");
const personaRouter = require("./routes/personaRoutes");
const oficinaRouter = require("./routes/oficinaRoutes");
const authRouter = require("./routes/authRoutes");

const app = express();

app.use(bodyParser.json()); //*Todas las respuestas de la aplicacion sean formateadas automaticamente en json
app.use(express.urlencoded({extended: true})); //*Sirve para poder utilizar postman y no crear un archivo json
app.use("/api/personas", personaRouter);
app.use("/api/oficinas", oficinaRouter);
app.use("/api/auth", authRouter);

app.listen(3000, () => {
    console.log("Aplicacion corriendo en puerto 3000");
})