const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer')
const validatorRegister = require('../middleware/validatorRegister')
const validatorLogin = require('../middleware/validatorLogin')
const loginController = require ('../controllers/loginController');

const guestMiddleware = require ('../middleware/guestMiddleware');
const authMiddleware = require ('../middleware/authMiddleware');

//Rutas para el formulario de login
router.get('/login',authMiddleware, loginController.login);
router.post('/login',validatorLogin, loginController.processLogin);

//Ruta del perfil una vez que el usuario este logeado
router.get('/profile', guestMiddleware, loginController.profile);

// Ruta para formulario de registro
router.get('/register', loginController.register);
router.post('/register', upload.single('avatar'), validatorRegister ,loginController.processRegister);

// Ruta para editar usuario
router.get('/edit/:id', loginController.edit);
router.put('/edit/:id', loginController.update)

// Ruta para eliminar el usuario
router.delete('/delete/:id', loginController.destroy)

// Ruta para procesar el Logout
router.get('/logout', loginController.logout);

module.exports = router;