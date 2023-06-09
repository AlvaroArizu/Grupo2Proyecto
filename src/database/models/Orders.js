module.exports = (sequelize, DataTypes) => {
    let alias = 'Order';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        total: DataTypes.DECIMAL,
        id_products: DataTypes.INTEGER,
        id_order: DataTypes.INTEGER,
    }
    let config = {
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        // createdAt: 'created_at',
        // updatedAt: 'updated_at',
        deletedAt: false,
        underscored: true,
        tablename:"orders"
    }
        
    
    const Order = sequelize.define(alias, cols, config)
    
    // Order.associate = function (models) {
    //     Order.hasMany(models.Product, {
    //       as: "Products",
    //       foreignKey: "id_products",
    //     });
    //   };

    //     Order.belongsTo(models.Detail_Order, {
    //       as: "Detail_Order",
    //       foreignKey: "id_order",
    //     });
    //   };
    // Order.associate = function (models) {
    //     Order.belongsTo(models.Payment, {
    //       as: "Payment",
    //       foreignKey: "id_payment",
    //     });
    //   };
    return Order;
  }