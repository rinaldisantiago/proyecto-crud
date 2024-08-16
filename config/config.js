//*Parametros de conexion con la base de datos

const parameters = {
    username: "root",
    password: "1234",
    database: "mi_db", //*Nombre de la base de datos
    host: "localhost",
    dialect: "mysql" //*El dialecto en el que tiene que hablar
}

module.exports = parameters; //*Exportamos el objeto parameters