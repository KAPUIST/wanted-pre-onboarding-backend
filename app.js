const express = require("express");
const sequelize = require("./util/database");
const dotenv = require("dotenv");
const app = express();
const PORT = process.env.SERVER_PORT || 3000;
const { errorMiddleware } = require("./middleware/errorMiddleware");
// const JobItem = require("./models/job-items");
const Company = require("./models/companies");
dotenv.config();

const jobs = require("./router/job");

app.use(jobs);
app.use(errorMiddleware);

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
