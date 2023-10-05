const express = require("express");
const sequelize = require("./util/database");
const dotenv = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const JobItem = require("./models/job-items");
const Companies = require("./models/companies");
dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const jobs = require("./router/job");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", jobs);

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
