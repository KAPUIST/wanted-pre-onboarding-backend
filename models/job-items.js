const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const JobItems = sequelize.define("jobItems", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  companyId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    foreignKey: true,
  },
  position: { type: Sequelize.STRING, allowNull: false },
  reward: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  detail: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  technology: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = JobItems;
