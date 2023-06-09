module.exports = (sequelize, DataTypes) => {
  let alias = "Category";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category: {
     type: DataTypes.STRING,
    allowNull: false
    }
  };
  let config = {
    timestamps: false,
    underscored: true,
    tablename: "categories",
  };

  const Category = sequelize.define(alias, cols, config);
  Category.associate = function (models) {
    Category.hasMany(models.Product, {
      as: "Products",
      foreignKey: "id_category",
    });
  };
  return Category;
};
