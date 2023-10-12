const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const JobItems = sequelize.define("jobItems", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    validate: {
      isInt: true,
      notEmpty: true,
    },
  },
  companyId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    foreignKey: true,
    validate: {
      isInt: true,
      notEmpty: true,
    },
  },
  position: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  reward: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isInt: true,
    },
  },
  detail: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  technology: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});
module.exports = JobItems;
