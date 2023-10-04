const Job = require("../models/job-items");

exports.getJobs = (req, res, next) => {
  Job.findAll()
    .then((jobs) => {
      res.status(200).json(jobs);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.AddJob = (req, res, next) => {
  const { companyId, position, reward, detail, technology } = req.body;
  Job.create({});
};
