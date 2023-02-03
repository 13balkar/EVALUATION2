const { companies } = require('../../database/models');
const makeJson = (data) => {
  data = data.split('\r');
  data = data[0].split('\n');
  const details = [];
  data.map(entity => {
    let detail = entity.split('\r');
    detail = detail[0].split(',');
    if (detail[0] != 'company_id')
      details.push({ companyId: detail[0], sector: detail[1] });
  });
  return details;
};
const fetchDetails = async (urlLink) => {
  const details = await fetch(urlLink)
    .then(response => response.text())
    .then(data => {
      return makeJson(data);
    });
  return details;
};


const getDetailBySector = async (companySector, companyId) => {
  const url = 'http://54.167.46.10/sector?name=' + companySector;
  const data = await fetch(url)
    .then(response => response.text())
    .then(data => {
      return data;
    });
  return data;
};


const getDetailById = async (companyId) => {
  const url = 'http://54.167.46.10/company/' + companyId;
  const data = await fetch(url)
    .then(response => response.text())
    .then(data => {
      return data;
    });
  return data;
};

// const getCompanyDetails = (companyDetailsInJson) => {
//   let promises = [];
//   companyDetailsInJson.map(entity => {
//     promises.push(getDetailById(entity.companyId));

//   });
//   return Promise.all(promises);
// };


const calculateScore = (companyId, detailBySector) => {
  let score = 0;
  detailBySector.forEach(element => {
    if (element.companyId === companyId) {
      const performance = element.performanceIndex;

      score = ((performance[0].value * 10) + (performance[2].value * 10) + (performance[1].value / 10000) + performance[3].value) / 4;
    }
  });
  return score;
};
const getCompanyDetails = async (companyDetailsInJson) => {
  const allCompanyDetails = [];
  for (let iterator = 0; iterator < companyDetailsInJson.length; iterator++) {
    let IdData = await getDetailById(companyDetailsInJson[iterator].companyId);
    IdData = JSON.parse(IdData);
    const sectorData = await getDetailBySector(companyDetailsInJson[iterator].sector, companyDetailsInJson[iterator].companyId);
    const score = calculateScore(companyDetailsInJson[iterator].companyId, JSON.parse(sectorData));
    const detailRequired = { companyName: IdData['name'], companyId: companyDetailsInJson[iterator].companyId, ceoName: IdData['ceo'], companyScore: score, sector: companyDetailsInJson[iterator].sector };
    allCompanyDetails.push(detailRequired);
  }

  return allCompanyDetails;
};

const saveDetail = async (urlLink) => {
  const companyDetailsInJson = await fetchDetails(urlLink);
  const detailsCompanyWise = await getCompanyDetails(companyDetailsInJson);
  return detailsCompanyWise;
};
module.exports = { saveDetail };
