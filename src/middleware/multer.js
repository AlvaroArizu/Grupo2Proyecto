const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //lugar donde se van a guardar las fotos
    let reqPath = req.originalUrl.includes("admin") ? "products" : "avatar";
    let filePath = path.resolve(__dirname, `../../public/images/${reqPath}`);

    cb(null, filePath);
  },

  //nombre que van a llevar las fotos
  filename: function (req, file, cb) {
    let reqPath = req.originalUrl.includes("products")
      ? "products-"
      : "avatar-";
    let filename = `${reqPath}` + Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // filtro para cargar las imagenes con el formato permitido.
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(null, false);
      // return cb(`Error: Error al cargar la extensión del archivo. Las extensiones permitidas ${filetypes}`)
    }
  },
});

module.exports = upload;
