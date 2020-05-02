'use strict';
module.exports = (sequelize, DataTypes) => {
  const DiscountCode = sequelize.define('DiscountCode', {
    code: DataTypes.STRING,
    percent: DataTypes.SMALLINT,
    remaining: DataTypes.INTEGER,
    expire: DataTypes.DATE
  }, {});
  DiscountCode.associate = function(models) {
    // associations can be defined here
  };
  return DiscountCode;
};