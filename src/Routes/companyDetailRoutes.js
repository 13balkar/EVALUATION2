const express = require('express');
const companyDetailRouter = express.Router();
const { saveDetail } = require('../Controllers/companyDetailController');
companyDetailRouter.post('/save', saveDetail);

module.exports = companyDetailRouter;