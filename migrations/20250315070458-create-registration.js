"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("registrations", {
      id: { 
        allowNull: false, 
        autoIncrement: true, 
        primaryKey: true, 
        type: Sequelize.INTEGER 
      },
      teacherId: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: "teachers", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      studentId: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: "students", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      isSuspended: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: { 
        allowNull: false, 
        type: Sequelize.DATE 
      },
      updatedAt: { 
        allowNull: false, 
        type: Sequelize.DATE 
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("registrations");
  }
};
