module.exports = (sequelize, DataTypes) => {
  let alias = "Brands";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING,
        // allowNull: false
    }
  };
  let config = {
    timestamps: false,
    underscored: true,
    tablename: "brands",
  };

 const Brands = sequelize.define(alias, cols, config);
   Brands.associate = function (models) {
     Brands.hasMany(models.Product, {
       as: "Products",
       foreignKey: "id_brands",
     });
   };
  return Brands;
};
