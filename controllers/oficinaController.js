const db = require("../models");
const Oficina = db.oficina;

const home = (req, res) => {
    res.status(200).send("Ruta principal de oficinas");
}

const listOficina = async(req, res) => {
    try {
        const listaOficina = await Oficina.findAll();
        if (listaOficina.length > 0) {
            res.status(200).send(listaOficina);
        } else {
            res.status(404).send({ message: "Aun no hay registros" });
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const create = async(req, res) => {
    const { oficina } = req.body;
    if (!oficina) {
        return res.status(400).send({ message: "Faltan datos de completar" });
    }
    try {
        const oficina = await Oficina.create(req.body);
        res.status(201).send(oficina);
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            res.status(400).send({ message: "Oficina ya existente" });
        } else {
            res.status(500).send({
                message: error.message,
                nombre: error.name
            });
        }
    }
};

module.exports={
    home,
    listOficina,
    create
}