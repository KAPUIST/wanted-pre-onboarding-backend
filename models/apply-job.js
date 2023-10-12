const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const ApplyJob = sequelize.define(
  "applyJob",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    jobItemId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        notEmpty: true,
      },
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        notEmpty: true,
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["userId", "jobItemId"],
      },
    ],
  }
);

module.exports = ApplyJob;
