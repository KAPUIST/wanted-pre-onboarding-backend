const express = require("express");
const jobController = require("../controller/job");
const router = express.Router();

//채용공고 불러오기
router.get("/jobs", jobController.getJobs);
//채용공고 등록하기
router.post("/job", jobController.AddJob);
//채용공고 수정하기
router.put("/job");
//채용공고 삭제하기
router.delete("/job/:jobId");
//채용공고 검색하기(Optional)

module.exports = router;
