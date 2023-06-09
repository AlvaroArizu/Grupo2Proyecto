module.exports = (sequelize, DataTypes) => {
  let alias = "Payment";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  };
  let config = {
    timestamps: true,
    createdAt: false,
    updatedAt: false,
    // createdAt: "created_at",
    // updatedAt: "updated_at",
    deletedAt: false,
    underscored: true,
    tablename: "payments",
  };

  const Payment = sequelize.define(alias, cols, config);
  // Payment.associate = function (models) {
  //   Payment.belongsTo(models.Orders, {
  //     as: "Order",
  //     foreignKey: "id_payment",
  //   });
  // };
  return Payment;
};
