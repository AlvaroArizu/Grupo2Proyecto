module.exports = (sequelize, DataTypes) => {
  let alias = "User";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    id_rol: DataTypes.INTEGER,
  };
  let config = {
    timestamps: false,
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true,
    tablename: "Users",
    paranoid: true,
  };

  const User = sequelize.define(alias, cols, config);

  User.associate = function (models) {
    User.belongsTo(models.Rol, {
      as: "Rol",
      foreignKey: "id_rol",
    });
   
  };

  return User;
};
