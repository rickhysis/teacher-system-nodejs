"use strict";
module.exports = (sequelize, DataTypes) => {
  const Registration = sequelize.define("registration", {
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "teachers",
        key: "id"
      }
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "students",
        key: "id"
      }
    },
    isSuspended: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, 
    },
  });

  Registration.associate = function(models) {
    Registration.belongsTo(models.student, { foreignKey: "studentId" });
    Registration.belongsTo(models.teacher, { foreignKey: "teacherId" });
  };

  return Registration;
};

