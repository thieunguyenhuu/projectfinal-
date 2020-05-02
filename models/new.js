'use strict';
module.exports = (sequelize, DataTypes) => {
  const New = sequelize.define('New', {
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  New.associate = function(models) {
    // associations can be defined here
  };
  return New;
};