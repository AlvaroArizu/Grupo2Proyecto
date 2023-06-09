const db = require("../database/models");

//Controlador del index y contacto
const mainControllers = {
  index: function (req, res) {
    res.render("index", {
      title: "TecnoPhone",
    });
  },
  prueba: async function (req, res) {
    try {
      let producto = await db.Product.findAll({
        include: [
          { association: "Brands" },
          { association: "Category" },
          { association: "Color" },
          { association: "Model" },
          { association: "imagen" },
          //  {association: 'Order'}
        ],
      });
      let usuario = await db.User.findAll({
        include: [{ association: "Rol" }, { association: "imagen" }],
      });
      let brands = await db.Brands.findAll();
      let category = await db.Category.findAll();
      let color = await db.Color.findAll();
      let detail_order = await db.Detail_Order.findAll();
      let imagen = await db.Imagen.findAll();
      let model = await db.Model.findAll();
      let rol = await db.Rol.findAll();
      let payment = await db.Payment.findAll();
      // let order = await db.Order.findAll({
      //   include: [{ association: "Detail_Order" }],
      // });

      res.json({
        //producto,
        usuario,
        brands,
        category,
        color,
        detail_order,
        imagen,
        model,
        rol,
        payment,
        //order,
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  contacto: function (req, res) {
    res.render("contacto", {
      title: "Contacto",
    });
  },
  shoppingcart: function (req, res) {
    res.render("shoppingcart", {
      title: "Carrito",
    });
  },
};

module.exports = mainControllers;
