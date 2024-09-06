const db = require("../models");
const Persona = db.persona;
const { Op } = require('sequelize');

const home = (req, res) => {
  res.status(200).send("Ruta principal de personas"); /* Se establece primero el codigo de estado de http (res.status) donde el 200 representa una respuesta satisfactoria.
    Seguido del comentario anterior, el .send manda el mensaje que dice "Ruta principal de personas" */
};

/* 
Esta función es un controlador asíncrono que maneja la solicitud para listar 
todas las personas almacenadas en la base de datos.
Utiliza el modelo 'Persona' para buscar y recuperar todos los registros (findAll()), y los 
devuelve como respuesta en formato JSON con un código de estado 200 (OK).
En caso de que ocurra un error durante la consulta a la base de datos, 
se captura (catch) y se devuelve un mensaje de error con un código de estado 500 
(Error Interno del Servidor).
*/

const list = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;

    if (page < 1 || limit < 1) {
      return res.status(400).send({ 
        message: "Page and limit must be positive" });
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Persona.finAndCountAll({
      attributes: { exclude: ["password", "oficinaId"] },
      include: [{
        model: Oficina,
        attributes: ["nombre"]
      }],
      limit: limit,
      offset: offset
    })

    const listaPersonas = await Persona.findAll();
    if (listaPersonas.length > 0) {
      res.status(200).send(listaPersonas);
    } else {
      res.status(404).send({ message: "Aun no hay registros" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

/* 
Esta función es un controlador asíncrono que maneja la solicitud para crear 
una nueva persona en la base de datos. Utiliza el modelo 'Persona' para 
crear un nuevo registro (create) basado en los datos proporcionados en el cuerpo 
de la solicitud (req.body), y devuelve la nueva persona con un código 
de estado 201 (Creado). Si ocurre un error durante el proceso, se captura 
y se devuelve un mensaje de error con un código de estado 500 
(Error Interno del Servidor).
*/

const create = async (req, res) => {
  const { nombre, mail, edad } = req.body;
  if (!nombre || !mail || !edad) {
    return res.status(400).send({ message: "Faltan datos por completar" });
  }
  try {
    const persona = await Persona.create(req.body);
    res.status(201).send(persona);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).send({ message: "Mail ya existente" });
    } else {
      res.status(500).send({
        message: error.message,
        nombre: error.name,
      });
    }
  }
};

const findById = async (req, res) => {
  try {
    const persona = await Persona.findByPk(req.params.id);
    if (persona) {
      res.status(200).send(persona);
    } else {
      res.status(404).send({ message: "Not found" });
    }
  } catch {
    res.status(500).send({ message: "Error interno del server" });
  }
};

const update = async (req, res) => {
  try {
    const persona = await Persona.update(req.body, {
      where: {id: req.params.id}
    })
    if (persona[0]) {
      const personaUpdate = await Persona.findByPk(req.params.id);
      res.status(200).send({ 
        message: "Actualizado!!",
        persona: personaUpdate
      });
    } else {
      res.status(404).send({ message: "Not found" });
    }
    } catch (error) {
      res.status(500).send({ message: "Error interno del servidor" });
    }
}

const buscarPorNombre = async (req, res) => {
  try {
    const keyword = req.body.keyword;
    if (!keyword) {
      return res.status(400).send({ message: "Debe proporcionar un keyword" });
    }
    const results = await Persona.findAll({
      where: {nombre: {
        [Op.like]: `%${keyword}%` 
      }}
    })
    if (results.length > 0) {
      res.status(200).send({ resultados: results });
    } else {
      res.status(404).send({ message: "No hay resultados" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error interno del servidor" });
  }
}

const deletePersona = async (req, res) => {
  try {
    const persona = await Persona.destroy({
      where: {id: req.params.id}
    });
    if (persona) {
      res.status(200).send({ message: "Eliminado!!!" });
    } else {
      res.status(404).send({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error interno del servidor", tipo: error.name });
  }
}

module.exports = {
  home,
  list,
  create,
  findById,
  update,
  buscarPorNombre,
  deletePersona
};