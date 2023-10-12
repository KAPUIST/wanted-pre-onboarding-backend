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
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
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
