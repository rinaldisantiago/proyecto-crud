const jtw = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header("Authorization");
    //Verificar si existe el token
    if (!token) {
        return res.status(401).send({message: "No hay token"}); 
    }
    //Decodificarlo
    try {
        const verified = jtw.verify(token, "1234");
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({
            message: "token no valido",
            info: error.message
        })
    }
} 

module.exports = auth;