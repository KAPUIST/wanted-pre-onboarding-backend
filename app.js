const express = require("express");
const sequelize = require("./util/database");
const dotenv = require("dotenv");
const app = express();
const { errorMiddleware } = require("./middleware/errorMiddleware");
const JobItem = require("./models/job-items");
const Companies = require("./models/companies");
dotenv.config();
const PORT = process.env.SERVER_PORT || 8080;
const jobs = require("./router/job");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", jobs);

app.use(errorMiddleware);

Companies.hasMany(JobItem, { foreignKey: "companyId", sourceKey: "id" });
JobItem.belongsTo(Companies, { foreignKey: "companyId", targetKey: "id" });

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
