const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productControllers');


// Listado de productos
router.get('/all', productControllers.allProducts);

// // Ver producto
// router.get('/:id', productControllers.show);


module.exports = router;