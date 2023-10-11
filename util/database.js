const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();
const sequelize = new Sequelize(
  process.env.DB_NAME || "wanted-pre-onboarding",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST || "localhost",
  }
);
// db.sequelize = sequelize;
// db.Companies = Companies;
// db.JobItems = JobItems;

module.exports = sequelize;
