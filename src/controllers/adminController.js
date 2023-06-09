const path = require("path");
const db = require("../database/models");
const Product = db.Product;
const Category = db.Category;
const Brands = db.Brands;
const Color = db.Color;
const Model = db.Model;
const Imagen = db.Imagen;

const { validationResult } = require("express-validator");

const adminControllers = {
  // controlo la vista del admin para editar y eliminar productos
  getAllProducts: async (req, res) => {
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
          {
            association: "Imagen",
          },
        ],
      });

      res.render("products/adminIndex.ejs", {
        allProducts,
      });
    } catch (error) {
      console.error(error);
    }
  },

  // Vista de la creación de un producto
  create: async (req, res) => {
    try {
      let category = await Category.findAll();
      let model = await Model.findAll();
      let color = await Color.findAll();
      let brands = await Brands.findAll();

      res.render("products/adminCreate.ejs", {
        category,
        model,
        color,
        brands,
      });
    } catch (error) {
      console.log(error);
    }
  },

  // Controlamos la creación del producto
  store: async (req, res) => {
    const resultValidation = validationResult(req);
    // console.log("resultValidation", resultValidation);
    let images = [];
    if (req.files) {
      images = req.files.map((image) => {
        return {
          imagen: image.filename,
        };
      });
    }
    req.body.images = images;

    try {
      if (resultValidation.errors.length > 0) {
        //consulto si hay errores
        let category = await Category.findAll(); // como renderizo la views adminCreate debo tener en cuenta que debo hacer la consulta a la base de datos nuevamente
        let model = await Model.findAll();
        let color = await Color.findAll();
        let brands = await Brands.findAll();

        return res.render("products/adminCreate.ejs", {
          errors: resultValidation.mapped(),
          category,
          model,
          color,
          brands,
          oldData: req.body,
        });
      } else {
        let newProduct = {
          name: req.body.name,
          price: req.body.price,
          description: req.body.description || "",
          id_category: req.body.category,
          id_brands: req.body.brands,
          id_model: req.body.model,
          id_color: req.body.color,
          imagen: req.body.images,
        };

        let product = await Product.create(newProduct);

        let image = await Imagen.bulkCreate(newProduct.imagen);
        let pivotCreate = image.map((image) => {
          return {
            id_imagen: image.id,
            id_products: product.id,
          };
        });
        await db.ImageProduct.bulkCreate(pivotCreate);
        res.redirect("/admin/control");
      }
    } catch (error) {
      console.log(error);
    }
  },
  // Controlamos el softdelete
  destroy: async (req, res) => {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/admin/control");
  },
  edit: async (req, res) => {
    let product = await Product.findByPk(req.params.id, {
      include: [{ association: "Imagen" }],
    });
    let category = await Category.findAll();
    let model = await Model.findAll();
    let color = await Color.findAll();
    let brands = await Brands.findAll();

    res.render("products/adminEdit", {
      product,
      category,
      model,
      color,
      brands,
    });
  },
  update: async (req, res) => {
    const resultValidation = validationResult(req);
    try {
      if (resultValidation.errors.length > 0) {
        //consulto si hay errores
        let product = await Product.findByPk(req.params.id, {
          include: [{ association: "Imagen" }],
        });
        let category = await Category.findAll();
        let model = await Model.findAll();
        let color = await Color.findAll();
        let brands = await Brands.findAll();

        return res.render("products/adminEdit", {
          product,
          category,
          model,
          color,
          brands,
          oldData: req.body,
          errors: resultValidation.mapped(),
        });
      } else {
        let toUpdate = {
          name: req.body.name,
          price: req.body.price,
          description: req.body.description || "",
          id_category: req.body.category,
          id_brands: req.body.brands,
          id_model: req.body.model,
          id_color: req.body.color,
        };
        await Product.update(toUpdate, {
          where: {
            id: req.params.id,
          },
        });
        res.redirect("/admin/show/" + req.params.id);
      }
    } catch (error) {
      console.log(error);
    }
  },

  show: async (req, res) => {
    let product = await Product.findByPk(req.params.id);
    res.render("products/adminShow", {
      title: "Producto",
      product,
    });
  },
  fileEdit: async (req, res) => {
    await Imagen.update(
      {
        imagen: req.file.filename,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.redirect("/admin/control");
  },
  fileDelete: async (req, res) => {
    await Imagen.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/admin/control");
  },
};

module.exports = adminControllers;
