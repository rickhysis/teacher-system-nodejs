"use strict";
module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define("teacher", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
  });

  Teacher.associate = function(models) {
    Teacher.belongsToMany(models.student, {
      through: models.registration,
      foreignKey: "teacherId"
    });

    Teacher.hasMany(models.registration, { foreignKey: "teacherId" });
  };

  return Teacher;
};
