const express = require('express');
const router = express.Router();

const mainControllers = require ('../controllers/mainControllers');

//Rutas para el index
router.get('/', mainControllers.index);

//Rutas para el contacto
router.get('/contacto', mainControllers.contacto);

//Rutas para el carrito
router.get('/shoppingcart', mainControllers.shoppingcart);

//Usamos esta ruta para probar toda la base de datos
router.get("/prueba", mainControllers.prueba)




module.exports = router;