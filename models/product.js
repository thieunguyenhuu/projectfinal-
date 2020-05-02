"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      code: DataTypes.STRING,
      slug: DataTypes.STRING,
      name: DataTypes.STRING,
      images: DataTypes.JSON,
      description: DataTypes.TEXT,
      inStock: DataTypes.SMALLINT,
      price: DataTypes.DOUBLE,
      isActive: DataTypes.BOOLEAN,
      producerId: DataTypes.INTEGER,
    },
    {}
  );
  Product.associate = function (models) {
    Product.belongsTo(models.Category, { foreignKey: "categoryId" });
    Product.belongsTo(models.Producer, { foreignKey: "producerId" });

    Product.hasMany(models.Rating, { foreignKey: "productId" });
    Product.hasMany(models.OrderDetail, { foreignKey: "productId" });
  };
  return Product;
};
