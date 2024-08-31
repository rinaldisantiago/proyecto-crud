const express = require("express");
const router = express.Router();
const oficinaControler = require("../controllers/oficinaController");
const auth = require("../middlewares/authmiddleware");


router.get("/", oficinaControler.home);
router.get("/list", oficinaControler.listOficina);
router.post("/create", auth, oficinaControler.create);


module.exports = router;