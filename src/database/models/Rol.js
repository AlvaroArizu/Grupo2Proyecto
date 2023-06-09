module.exports = (sequelize, DataTypes) => {
  let alias = "Rol";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rol: DataTypes.STRING,
  };
  let config = {
    underscored: true,
    createdAt: false,
    updatedAt: false,
    tablename: "rols"
  };

  const Rol = sequelize.define(alias, cols, config);

  Rol.associate = function (models) {
    Rol.hasMany(models.User, {
      as: "User",
      foreignKey: "id_rol",
    });
  };

  return Rol;
};
