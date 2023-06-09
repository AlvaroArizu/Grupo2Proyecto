module.exports = (sequelize, DataTypes) => {
  let alias = "Detail_Order";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    total: DataTypes.DECIMAL,

  };
  let config = {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: true,
    paranoid: true,
    underscored: true,
    tablename: "detail__orders"
  };

  const Detail_Order = sequelize.define(alias, cols, config);
  Detail_Order.associate = function (models) {
    Detail_Order.belongsTo(models.Order, {
      as: "Order",
      foreignKey: "id_order",
    });
  };
  return Detail_Order;
};
