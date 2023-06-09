const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const validatorCreate = require("../middleware/validatorCreate");
const adminControllers = require("../controllers/adminController");
const adminMiddleware = require("../middleware/adminMiddleware");

// Vista de control de Admin
router.get("/control", adminMiddleware, adminControllers.getAllProducts);
router.get("/show/:id", adminMiddleware, adminControllers.show);

// Crear producto admin
router.get("/create", adminMiddleware, adminControllers.create);
router.post(
  "/create",
  upload.array("image", 4),
  validatorCreate,
  adminControllers.store
);

// Actualizar producto
router.get("/edit/:id", adminMiddleware, adminControllers.edit);
router.put("/edit/:id", validatorCreate, adminControllers.update);

// Eliminar producto
router.delete("/delete/:id", adminControllers.destroy);

// Editar la imagen
router.put(
  "/fileEdit/:id",
  upload.single("fileEdit"),
  adminControllers.fileEdit
);

// Eliminar la imagen
router.delete("/fileDelete/:id", adminControllers.fileDelete);

module.exports = router;
