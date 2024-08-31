//*Se define el modelo de la tabla persona

const bcrypt = require("bcrypt");

const Persona = (sequelize /*Objeto de conexion*/, Sequelize /*Conjunto de configuraciones propias del sequelize*/) => {
    return sequelize.define("Persona" /*Como se va a llamar cada registro (se le agrega una s al final en la tabla de MySQL Workbench)*/, {
        nombre: { //*Nombre de la columna
            type: Sequelize.STRING, //*Tipo de dato que tendra cada registro dentro de la columna "nombre" (str)
            allowNull: false //*No permite que acepte valores nulos
        },
        mail: { 
            type: Sequelize.STRING,
            allowNull: false,
            unique: true //*Del ingles único, no permite que se dupliquen o repitan mails
        },
        edad: { 
            type: Sequelize.INTEGER,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false, //*Evita que el SEQUELIZE cree dos campos como lo son: fecha-hora de creacion; y fecha-hora de modificacion
        hooks: {
            beforeCreate: async (persona) => {
                if (persona.password) {
                    const salt = await bcrypt.genSalt(10);
                    persona.password = await bcrypt.hash(persona.password, salt);
                }
            },
        },
    })
}

module.exports = Persona; //*Exportamos la funcion Persona