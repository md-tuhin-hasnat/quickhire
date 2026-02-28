const express = require('express');
const { getJobs, getJob, createJob, deleteJob } = require('../controllers/job.controller');

const router = express.Router();

router.route('/')
    .get(getJobs)
    .post(createJob);

router.route('/:id')
    .get(getJob)
    .delete(deleteJob);

module.exports = router;
