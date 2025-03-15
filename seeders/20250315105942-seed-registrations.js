"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("registrations", [
      {
        teacherId: 1, // teacher1@example.com
        studentId: 1, // student1@example.com
        isSuspended: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        teacherId: 1,
        studentId: 2,
        isSuspended: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        teacherId: 2, // teacher2@example.com
        studentId: 3, // student3@example.com
        isSuspended: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("registrations", null, {});
  },
};
