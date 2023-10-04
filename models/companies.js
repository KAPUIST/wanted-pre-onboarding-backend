const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Companies = sequelize.define("companies", {
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
