const express = require("express");
const applyJobController = require("../controller/apply-job");
const router = express.Router();

//채용공고 지원하기
router.post("/applyJob", applyJobController.applyJob);
//채용공고 지원 삭제
router.delete("/applyJob/:applyJobId", applyJobController.deleteApplyJob);
module.exports = router;
