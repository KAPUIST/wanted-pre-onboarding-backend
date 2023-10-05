const Job = require("../models/job-items");
const Companies = require("../models/companies");
exports.getJobs = (req, res, next) => {
  Job.findAll({
    include: [
      { model: Companies, attributes: ["country", "region", "companyName"] },
    ],
  })
    .then((jobs) => {
      if (jobs.length === 0)
        return res.status(200).json({ message: "has no data" });

      res.status(200).json(jobs);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some Error",
      });
    });
};
exports.AddJob = (req, res, next) => {
  const { companyId, position, reward, detail, technology } = req.body;
  Job.create({});
};
