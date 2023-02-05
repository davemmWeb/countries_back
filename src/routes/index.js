const { Router } = require("express");
const Countries = require("../routes/Countries");
const Activities = require("../routes/Activities");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/countries", Countries);
router.use("/activities", Activities);

module.exports = router;
