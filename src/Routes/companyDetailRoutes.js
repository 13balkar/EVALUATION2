const express = require('express');
const companyDetailRouter = express.Router();
const { saveDetail, getBySector } = require('../Controllers/companyDetailController');
companyDetailRouter.post('/save', saveDetail);
companyDetailRouter.post('/companies?sector', getBySector);
module.exports = companyDetailRouter;