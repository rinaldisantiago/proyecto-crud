const db = require("./models"); 

//*Esto simplemente crea las tablas de nuestra base de datos
db.sequelize.sync({force: true /*Parametro de configuracion que resetea por completo la tabla*/ })
    .then(() => {
        console.log("Sincronizacion exitosa!");
    })
    .catch((error) => {
        console.error(`Fallo la sincronizacion ${error}`);
    })