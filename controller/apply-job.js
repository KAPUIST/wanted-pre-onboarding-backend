const ApplyJob = require("../models/apply-job");

exports.applyJob = async (req, res, next) => {
  const { jobItemId, userId } = req.body;
  if (!jobItemId || !userId) {
    next({ status: 400, message: "Required field" });
    return;
  }

  let checkDuplicate = await ApplyJob.findOne({
    where: { jobItemId, userId },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    raw: true,
  });
  if (checkDuplicate !== null) {
    next({ status: 400, message: "DUPLICATED_APPLY" });
    return;
  }

  await ApplyJob.create({
    jobItemId,
    userId,
  })
    .then((result) => {
      res.status(201).json({
        message: "Success!",
        data: result.dataValues,
      });
    })
    .catch((err) => {
      console.log(err.message);
      next(err);
    });
};

exports.deleteApplyJob = async (req, res, next) => {
  const applyJobId = req.params.applyJobId;
  if (!applyJobId) {
    next({ status: 400, message: "Required field" });
    return;
  }
  await ApplyJob.destroy({ where: { id: applyJobId } })
    .then((result) => {
      if (result === 0) {
        next({ status: 400, message: "DELETE_FAILED" });
        return;
      }
      res.status(200).json({ message: "Success!" });
    })
    .catch((err) => {
      console.log(err);
      next({ status: 400, message: "SERVER_ERROR" });
    });
};
