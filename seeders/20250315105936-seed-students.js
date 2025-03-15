"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("students", [
      {
        email: "student1@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "student2@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "student3@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("students", null, {});
  },
};
