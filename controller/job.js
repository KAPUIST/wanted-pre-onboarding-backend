const Job = require("../models/job-items");
const Companies = require("../models/companies");
const sequelize = require("sequelize");
const Op = sequelize.Op;
exports.getJobs = async (req, res, next) => {
  await Job.findAll({
    include: [
      { model: Companies, attributes: ["country", "region", "companyName"] },
    ],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((jobs) => {
      if (jobs.length === 0) {
        next({ status: 204, success: true, message: "No content" });
        return;
      }

      res.status(200).json(jobs);
    })
    .catch((err) => {
      console.log(err);
      next({ status: 400, message: "SERVER_ERROR" });
    });
};
exports.getDetailJobs = async (req, res, next) => {
  const jobItemId = req.params.jobItemId;
  const detailJob = await Job.findOne({
    include: { model: Companies, attributes: ["country", "region"] },
    where: { id: jobItemId },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    raw: true,
  })
    .then((result) => {
      console.log("success!");
      return result;
    })
    .catch((err) => {
      console.log(err);
      next({ status: 400, message: "SERVER_ERROR" });
    });
  if (detailJob === null) {
    next({ status: 400, message: "JOB_NOT_FOUND" });
    return;
  }
  await Job.findAll({
    where: { companyId: detailJob.companyId, id: { [Op.notIn]: [jobItemId] } },
    raw: true,
    attributes: ["id"],
  })
    .then((result) => {
      let jobKey = [];
      if (result.length > 0) {
        jobKey = Object.values(...result);
      }
      detailJob.anotherJobs = jobKey;
      res.status(200).json(detailJob);
    })
    .catch((err) => {
      console.log(err);
      next({ status: 400, message: "SERVER_ERROR" });
    });
};
exports.addJob = async (req, res, next) => {
  const { companyId, position, reward, detail, technology } = req.body;

  await Job.create({
    companyId,
    position,
    reward,
    detail,
    technology,
  })
    .then((result) => {
      res.status(201).json({
        message: "Success!",
        data: result.dataValues,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.editJob = async (req, res, next) => {
  const { jobItemId, position, reward, detail, technology } = req.body;

  if (!jobItemId) {
    next({ status: 400, message: "Required field" });
    return;
  }
  if (isNaN(Number(jobItemId))) {
    next({ status: 400, message: "jobItemId must be number" });
    return;
  }
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
      if (result[0] === 0) {
        next({ status: 400, message: "UPDATE_FAILED" });
        return;
      }

      res.status(200).json({
        message: "Success!",
        data: {
          position,
          reward,
          detail,
          technology,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.deleteJob = async (req, res, next) => {
  const jobItemId = Number(req.params.jobItemId);
  if (isNaN(jobItemId)) {
    next({ status: 400, message: "jobItemId must be number" });
    return;
  }

  await Job.destroy({ where: { id: jobItemId } })
    .then((result) => {
      if (result === 0) {
        next({ status: 400, message: "DELETE_FAILED" });
        return;
      }
      res.status(200).json({ message: "Success!" });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
