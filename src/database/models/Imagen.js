module.exports = (sequelize, DataTypes) => {
    let alias = 'Imagen';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        imagen: DataTypes.STRING,
    }
    let config = {
        timestamps: true,
        created_at: "created_at",
        uptdated_at: "updated_at",
        deleted_at: "deleted_at",
        paranoid: true,
        underscored: true,
        tablename: "imagens"
    }
        
    
    const Imagen = sequelize.define(alias, cols, config)
    Imagen.associate = function(models){
        
        Imagen.belongsToMany(models.Product,{
            as: "Products",
            through: "image_products",
            foreignKey: "id_imagen",
            otherKey: "id_products",
          })
    }
    return Imagen;
}