const path = require("path");
const db = require("../database/models");
const Product = db.Product;
const Category = db.Category;
const Brands = db.Brands;
const Color = db.Color;
const Model = db.Model;
const Imagen = db.Imagen;


//Controlador de los productos
const productControllers = {
  allProducts: async (req, res) => {
    try {
      let allProducts = await Product.findAll({
        include: [
          {
            association: "Category",
          },
          {
            association: "Brands",
          },
          {
            association: "Color",
          },
          {
            association: "Model",
          },
        ],
      });
      
      res.render("products/productsShow.ejs", {
        title: "Productos",
        allProducts,
      });
    } catch (error) {
      console.error(error);
    }
  },
 
};

module.exports = productControllers;
