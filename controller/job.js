const Job = require("../models/job-items");
const Companies = require("../models/companies");
exports.getJobs = async (req, res, next) => {
  await Job.findAll({
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
exports.AddJob = async (req, res, next) => {
  const { companyId, position, reward, detail, technology } = req.body;

  await Job.create({
    companyId,
    position,
    reward,
    detail,
    technology,
  })
    .then((result) => {
      console.log("created jobItem");
      res.status(201).json({ message: "Success!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message || "Some Error" });
    });
};

exports.editJob = async (req, res, next) => {
  const { jobItemId, position, reward, detail, technology } = req.body;

  await Job.update(
    {
      position,
      reward,
      detail,
      technology,
    },
    { where: { id: jobItemId } }
  )
    .then((result) => {
      console.log("Update jobItem");
      res.status(200).json({ message: "Success!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message || "Some Error" });
    });
};

exports.deleteJob = async (req, res, next) => {
  const jobItemId = req.params.jobItemId;
  await Job.destroy({ where: { id: jobItemId } })
    .then((result) => {
      console.log("delete jobItem");
      res.status(200).json({ message: "Success!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message || "Some Error" });
    });
};
