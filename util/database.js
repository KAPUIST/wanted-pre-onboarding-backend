const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_SQL,
    host: process.env.DB_HOST,
  }
);
// db.sequelize = sequelize;
// db.Companies = Companies;
// db.JobItems = JobItems;

module.exports = sequelize;
