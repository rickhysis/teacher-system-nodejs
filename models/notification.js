"use strict";
module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define("notification", {
      teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
  
    Notification.associate = (models) => {
      Notification.belongsTo(models.teacher, { foreignKey: "teacherId" });
    };
  
    return Notification;
  };
  