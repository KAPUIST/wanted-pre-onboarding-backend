const express = require("express");
const sequelize = require("./util/database");
const dotenv = require("dotenv");
const app = express();
const PORT = process.env.SERVER_PORT || 3000;
const OrderItem = require("./models/job-items");
dotenv.config();

sequelize
  .sync()
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Sever running!!  PORT ${PORT} `);
    });
  })
  .catch((err) => {
    console.log(err);
  });
