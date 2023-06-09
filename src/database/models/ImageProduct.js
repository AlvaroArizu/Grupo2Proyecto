module.exports = (sequelize, DataTypes) => {
    let alias = "ImageProduct";
    let cols = {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_products: {
         type: DataTypes.INTEGER,
       
      
      },
      id_imagen:{
        type: DataTypes.INTEGER
      }
    };
    let config = {
      timestamps: false,
      underscored: true,
      tablename: "image_products",
    };
  
    const ImageProduct = sequelize.define(alias, cols, config);
    
    return ImageProduct;
  };
  