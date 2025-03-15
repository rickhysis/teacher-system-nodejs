"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("teachers", [
      {
        email: "teacher1@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "teacher2@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("teachers", null, {});
  },
};
