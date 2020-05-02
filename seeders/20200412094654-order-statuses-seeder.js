"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("OrderStatuses", [
      {
        name: "Chưa xử lý",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Đã đóng gói",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Đang giao",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Đã giao",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Đã huỷ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("OrderStatuses", null, {});
  },
};
