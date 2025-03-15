"use strict";
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define("student", {
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
  });

  Student.associate = function(models) {
    Student.belongsToMany(models.teacher, { 
      through: models.registration,
      foreignKey: "studentId"
    });

    Student.hasMany(models.registration, { foreignKey: "studentId" });
  };

  return Student;
};
