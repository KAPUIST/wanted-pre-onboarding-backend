const Job = require("../models/job-items");
const Companies = require("../models/companies");
const sequelize = require("sequelize");
const Op = sequelize.Op;
exports.getJobs = async (req, res, next) => {
  if (req.query.search) return next();
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
exports.searchJobs = async (req, res, next) => {
  let search = req.query.search;
  let companyId = await Companies.findOne({
    attributes: ["id"],
    where: { companyName: search },
    raw: true,
  });
  if (companyId === null)
    return res.status(500).json({ message: "has no jobItems" });

  Job.findAll({
    include: { model: Companies, attributes: ["country", "region"] },
    where: { companyId: companyId.id },
    attributes: [
      "id",
      "companyId",
      "position",
      "reward",
      "detail",
      "technology",
    ],
  })
    .then((result) => {
      console.log("success!");
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message || "Some Error" });
    });
};
exports.getDetailJobs = async (req, res, next) => {
  const jobItemId = req.params.jobItemId;
  const detailJob = await Job.findOne({
    include: { model: Companies, attributes: ["country", "region"] },
    where: { id: jobItemId },
    attributes: [
      "id",
      "companyId",
      "position",
      "reward",
      "detail",
      "technology",
    ],
    raw: true,
  })
    .then((result) => {
      console.log("success!");
      return result;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message || "Some ERROR" });
    });
  if (detailJob === null)
    return res
      .status(400)
      .json({
        message: "채용공고를 찾을수없습니다.",
        errorCode: "JOB_NOT_FOUND",
      });
  await Job.findAll({
    where: { companyId: detailJob.companyId, id: { [Op.notIn]: [jobItemId] } },
    raw: true,
    attributes: ["id"],
  })
    .then((result) => {
      let jobKey = [];
      console.log(result.length);
      if (result.length > 0) {
        jobKey = Object.values(...result);
      }
      detailJob.anotherJobs = jobKey;
      res.status(200).json(detailJob);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message || "Some ERROR" });
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
