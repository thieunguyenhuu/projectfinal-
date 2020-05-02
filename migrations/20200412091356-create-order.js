"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      receiverName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      receiverEmail: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      receiverPhoneNumber: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      receiverAddress: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      discountCode: {
        type: Sequelize.STRING,
      },
      discountPercent: {
        type: Sequelize.SMALLINT,
      },
      total: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      discount: {
        type: Sequelize.DOUBLE,
      },
      totalAmount: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      reasonCancel: {
        type: Sequelize.STRING,
      },
      statusId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "OrderStatuses",
            schema: "public",
          },
          key: "id",
        },
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users",
            schema: "public",
          },
          key: "id",
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Orders");
  },
};
