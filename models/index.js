const { Sequelize } = require("sequelize"); //*Dentro del paqeuete sequelize nos trae un objeto llamado Sequelize
const parameters = require("../config/config");

//*Se crea un objeto de conexion
const sequelize = new Sequelize(
    //*Se traen todos los parametros del objeto que se encuentra en el archivo config.js de la carpeta config
    parameters.database,
    parameters.username,
    parameters.password,
    {
        host: parameters.host,
        dialect: parameters.dialect
    }

);

const db = {};

db.Sequelize = Sequelize; //*Agregamos en el objeto db el Sequelize de la constante de la linea 1
db.sequelize = sequelize; //*agregamos en el objeto db el sequelize de la constante de la linea 6

db.persona = require("./persona")(sequelize, Sequelize);
db.oficina = require("./oficina")(sequelize, Sequelize);

db.oficina.hasMany(db.persona, {foreignKey: "oficinaID"});
db.persona.belongsTo(db.oficina, {foreignKey: "oficinaID"});

module.exports = db; //*exportamos el objeto db