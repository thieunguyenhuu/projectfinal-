"use strict";
module.exports = (sequelize, DataTypes) => {
  const Producer = sequelize.define(
    "Producer",
    {
      name: DataTypes.STRING,
      country: DataTypes.STRING,
    },
    {}
  );
  Producer.associate = function (models) {
    Producer.hasMany(models.Product, { foreignKey: "producerId" });
  };
  return Producer;
};
