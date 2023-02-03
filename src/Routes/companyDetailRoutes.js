const express = require('express');
const companyDetailRouter = express.Router();
const { saveDetail, getBySector } = require('../Controllers/companyDetailController');
companyDetailRouter.post('/save', saveDetail);
companyDetailRouter.get('/companies', getBySector);
module.exports = companyDetailRouter;