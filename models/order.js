"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      code: DataTypes.STRING,
      receiverName: DataTypes.STRING,
      receiverEmail: DataTypes.STRING,
      receiverPhoneNumber: DataTypes.STRING,
      receiverAddress: DataTypes.STRING,
      discountCode: DataTypes.STRING,
      discountPercent: DataTypes.SMALLINT,
      total: DataTypes.DOUBLE,
      discount: DataTypes.DOUBLE,
      totalAmount: DataTypes.DOUBLE,
      reasonCancel: DataTypes.STRING,
      statusId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {}
  );
  Order.associate = function (models) {
    Order.belongsTo(models.OrderStatus, { foreignKey: "statusId" });
    Order.belongsTo(models.User, { foreignKey: "userId" });

    Order.hasMany(models.OrderDetail, { foreignKey: "orderId" });
  };
  return Order;
};
