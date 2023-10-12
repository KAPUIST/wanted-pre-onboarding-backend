const express = require("express");
const jobController = require("../controller/job");
const router = express.Router();

//채용공고 불러오기
router.get("/jobs", jobController.getJobs);
//채용공고 상세보기(Optional)
router.get("/job/:jobItemId", jobController.getDetailJobs);
//채용공고 등록하기
router.post("/job", jobController.addJob);
//채용공고 수정하기
router.put("/job", jobController.editJob);
//채용공고 삭제하기
router.delete("/job/:jobItemId", jobController.deleteJob);

module.exports = router;
