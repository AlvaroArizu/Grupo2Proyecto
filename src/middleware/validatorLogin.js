const { body } = require("express-validator");
const path = require("path");

const validatorLogin = [
  body("email")
    .notEmpty()
    .withMessage("Este campo no debe tener un email registrado")
    .bail()
    .isEmail()
    .withMessage("Debes colocar un e-mail valido"),
  body("password").notEmpty().withMessage("Debes colocar una contraseña"),
];

module.exports = validatorLogin;
