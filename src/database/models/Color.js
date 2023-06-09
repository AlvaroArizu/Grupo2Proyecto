module.exports = (sequelize, DataTypes) => {
  let alias = "Color";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    color: {
       type: DataTypes.STRING,
    // allowNull: false, 
    
    }
  };
  let config = {
    timestamps: false,
    underscored: true,
    tablename: "colors",
  };

  const Color = sequelize.define(alias, cols, config);
  Color.associate = function (models) {
    Color.hasMany(models.Product, {
      as: "Products",
      foreignKey: "id_color",
    });
  };
  return Color;
};
