"use strict";
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    "Rating",
    {
      scores: DataTypes.SMALLINT,
      content: DataTypes.TEXT,
      isActive: DataTypes.BOOLEAN,
      productId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {}
  );
  Rating.associate = function (models) {
    Rating.belongsTo(models.Product, { foreignKey: "productId" });
    Rating.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Rating;
};
