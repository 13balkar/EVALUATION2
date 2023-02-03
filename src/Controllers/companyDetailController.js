const companyDetailManagaer = require('../Services/companyDetailManager');
const HttpErrors = require('../../Errors/httpErrors');

const saveDetail = async (req, res) => {
  try {
    const companyDetails = await companyDetailManagaer.saveDetail(req.body.urlLink);
    res.status(200).json(companyDetails);
  } catch (err) {
    if (err instanceof HttpErrors) {
      res.status(err.code).json(err.message);
    }
    else {
      res.status(500).send({ 'message': 'Internal server error.' });
    }
  }
};

const getBySector = async (req, res) => {
  try {
    const companyDetails = await companyDetailManagaer.getBySector(req.urlParams.get('product'));
    res.status(200).json(companyDetails);
  } catch (err) {
    if (err instanceof HttpErrors) {
      res.status(err.code).json(err.message);
    }
    else {
      res.status(500).send({ 'message': 'Internal server error.' });
    }
  }
};


module.exports = { saveDetail, getBySector };