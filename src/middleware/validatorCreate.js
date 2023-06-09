const { log } = require("console");
const { body } = require("express-validator");
const path = require("path");

const rulesCreate = [
  body("name")
    .isLength({ min: 4 })
    .withMessage("Por lo menos necesito 4 caracteres"),
  body("price")
    .isInt({ min: 1 })
    .withMessage("El importe debe ser un valor numérico"),
  body("description")
    .notEmpty()
    .withMessage("El producto debe tener una descripción"),
];

module.exports = rulesCreate;
