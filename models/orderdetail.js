"use strict";
module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define(
    "OrderDetail",
    {
      quantity: DataTypes.SMALLINT,
      price: DataTypes.DOUBLE,
      productId: DataTypes.INTEGER,
      orderId: DataTypes.INTEGER,
    },
    {}
  );
  OrderDetail.associate = function (models) {
    OrderDetail.belongsTo(models.Product, { foreignKey: "productId" });
    OrderDetail.belongsTo(models.Order, { foreignKey: "orderId" });
  };
  return OrderDetail;
};
