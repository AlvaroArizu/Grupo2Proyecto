module.exports = (sequelize, DataTypes) => {
  let alias = "Model";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
     type: DataTypes.STRING,
    // allowNull: false, 
    unique: true
    }
  };
  let config = {
    timestamps: false,
    underscored: true,
    tablename: "models",
  };

  const Model = sequelize.define(alias, cols, config);
  Model.associate = function(models){
    Model.hasMany(models.Product, {
      as: 'Products',
      foreignKey: 'id_model'
    })
  }
  return Model;
};
