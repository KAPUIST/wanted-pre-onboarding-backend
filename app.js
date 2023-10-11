const express = require("express");
const app = express();
const { errorMiddleware } = require("./middleware/errorMiddleware");
const JobItem = require("./models/job-items");
const Companies = require("./models/companies");

const jobs = require("./router/job");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", jobs);

app.use(errorMiddleware);

Companies.hasMany(JobItem, { foreignKey: "companyId", sourceKey: "id" });
JobItem.belongsTo(Companies, { foreignKey: "companyId", targetKey: "id" });

module.exports = app;
