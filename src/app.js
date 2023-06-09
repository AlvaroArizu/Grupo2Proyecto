const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const userSessionMiddleware = require("./middleware/userSessionMiddleware");
const userLoggedMiddleware = require("./middleware/userLoggedMiddleware");

const PORT = process.env.PORT || 3002;

//Requerimos las rutas para trabajar con db mysql
const mainRoutes = require("./routes/mainRoutes");
const productRoutes = require("./routes/productRoutes");
const loginRoutes = require("./routes/loginRoutes");
const adminRoutes = require("./routes/adminRoutes");

const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));

//Con este comando podemos ejecutar el motor de plantillas
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Con este metodo vamos a poder traer el Json a nuestro proyecto
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "Es nuestro secreto, que tu mirada y la mia...",
    resave: true,
    saveUninitialized: false,
  })
);

// middleware de cookies
app.use(cookieParser());

//middleware de app
app.use(userLoggedMiddleware);

//Usamos el metodo override
app.use(methodOverride("_method"));

//Usar las rutas para trabajar con db mysql
app.use(mainRoutes);
app.use("/products", productRoutes);
app.use("/admin", adminRoutes)

//middleware para verificar si hay cookie antes de iniciar sesión
app.use(userSessionMiddleware);
app.use(loginRoutes);

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
