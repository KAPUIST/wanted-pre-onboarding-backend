const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const jobItems = require("./job-items");
const Companies = sequelize.define("companies", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  companyName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  region: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Companies;
