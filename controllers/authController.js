const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const Persona = db.persona;

const login = async (req, res) => {
    const { mail, password } = req.body;

    try {
        //1 - Verificar que existe una cuenta con ese mail
        const persona = await Persona.findOne({where: {mail}});
        if (!persona) {
            return res.status(404).send({message: "Persona no encontrada"});
        }
        //2 - Verificar password
        const isMatch = await bcrypt.compare(password, persona.password);
        if (!isMatch) {
            return res.status(400).send({message: "Password incorrecto"});
        }
        //3 - Crear token
        const token = jwt.sign({
            id: persona.id,
            nombre: persona.nombre,
            mail: persona.mail
        }, "1234", { expiresIn: 180 });
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({
            message: "Error interno del servidor",
            tipo: error.name,
            detalles: error.message
        });
    }
}

module.exports = {
    login,
}