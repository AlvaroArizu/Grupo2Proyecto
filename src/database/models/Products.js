module.exports = (sequelize, DataTypes) => {
  let alias = "Product";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: DataTypes.STRING,
    id_category: DataTypes.BIGINT(10).UNSIGNED,
    id_brands: DataTypes.BIGINT(10).UNSIGNED,
    id_model: DataTypes.BIGINT(10).UNSIGNED,
    id_color: DataTypes.BIGINT(10).UNSIGNED,
  };
  let config = {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
    underscored: true,
    tablename: "products",
  };

  const Product = sequelize.define(alias, cols, config);
  Product.associate = function (models) {
    Product.belongsTo(models.Category, {
      as: "Category",
      foreignKey: "id_category",
    });
    Product.belongsTo(models.Brands, {
      as: "Brands",
      foreignKey: "id_brands",
    });
    Product.belongsTo(models.Color, {
      as: "Color",
      foreignKey: "id_color",
    });
    Product.belongsTo(models.Model, {
      as: "Model",
      foreignKey: "id_model",
    });
    // Product.belongsTo(models.Order, {
    //   as: "Order",
    //   foreignKey: "id_products",
    // });
    Product.belongsToMany(models.Imagen, {
      as: "Imagen",
      through: "image_products",
      foreignKey: "id_products",
      otherKey: "id_imagen",
    });
  };

  return Product;
};
