const { body } = require("express-validator");
const path = require("path");

const validatorRegister = [
  body("first_name")
    .isLength({ min: 2 })
    .withMessage("Por lo menos necesita 2 caracteres"),
  body("last_name")
    .isLength({ min: 2 })
    .withMessage("Por lo menos necesita 2 caracteres"),
  body("address")
    .isLength({ min: 5 })
    .withMessage("Por lo menos necesita 5 caracteres"),
  body("email")
    .notEmpty()
    .withMessage("Este campo no debe estar vacío")
    .bail()
    .isEmail()
    .withMessage("Debes colocar un e-mail valido"),
  body("password").notEmpty().withMessage("Debes colocar una contraseña"),
  body("avatar").custom((value, { req }) => {
    let file = req.file;

    let acceptedExtensions = [".jpeg", ".jpg", ".png"];
    let image_path = path.extname(file.filename);
    if (!acceptedExtensions.includes(image_path)) {
      throw new Error(
        `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
          ", "
        )}`
      );
    }

    return true;
  }),
];

module.exports = validatorRegister;
