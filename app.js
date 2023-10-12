const express = require("express");
const app = express();
const { errorMiddleware } = require("./middleware/errorMiddleware");
const JobItem = require("./models/job-items");
const Companies = require("./models/companies");
const User = require("./models/user");
const ApplyJob = require("./models/apply-job");

const jobs = require("./router/job");
const applyJob = require("./router/applyJob");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", jobs);
app.use("/api/v1", applyJob);

app.use(errorMiddleware);

Companies.hasMany(JobItem, { foreignKey: "companyId", sourceKey: "id" });
JobItem.belongsTo(Companies, { foreignKey: "companyId", targetKey: "id" });
JobItem.hasMany(ApplyJob, { foreignKey: "jobItemId", sourceKey: "id" });
User.hasMany(ApplyJob, { foreignKey: "userId", sourceKey: "id" });
ApplyJob.belongsTo(JobItem, { foreignKey: "jobItemId", targetKey: "id" });
ApplyJob.belongsTo(User, { foreignKey: "userId", targetKey: "id" });

module.exports = app;
