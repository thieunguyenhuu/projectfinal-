"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Products", {
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
      slug: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      images: {
        type: Sequelize.JSON,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      inStock: {
        allowNull: false,
        type: Sequelize.SMALLINT,
      },
      price: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Categories",
            schema: "public",
          },
          key: "id",
        },
        allowNull: false,
      },
      producerId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Producers",
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
    return queryInterface.dropTable("Products");
  },
};
