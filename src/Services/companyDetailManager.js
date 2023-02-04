const { company } = require('../../database/models');
const HttpErrors = require('../../Errors/httpErrors');
const utitlity = require('../Utils/companyUtilities');

let allCompanyDetails = [];

const saveDetail = async (urlLink) => {
  const companyDetailsInJson = await utitlity.fetchDetails(urlLink);
  allCompanyDetails = await utitlity.getCompanyDetails(companyDetailsInJson);
  return allCompanyDetails;
};

const getBySector = (sector) => {
  const output = [];
  allCompanyDetails.forEach(entity => {
    if (entity.sector === sector) {
      output.push(entity);
    }
  });
  return output;
};
module.exports = { saveDetail, getBySector };
