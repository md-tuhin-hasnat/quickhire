const express = require('express');
const { createApplication } = require('../controllers/application.controller');

const router = express.Router();

router.route('/')
    .post(createApplication);

module.exports = router;
