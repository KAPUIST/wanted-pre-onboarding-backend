const dotenv = require("dotenv");
dotenv.config();

const development = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "wanted-pre-onboarding",
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
  },
};

module.exports = development;
