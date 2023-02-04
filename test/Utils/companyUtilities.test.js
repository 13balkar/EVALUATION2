const utitlity = require('../../src/Utils/companyUtilities');

describe('Utility:  companyDetailManager', () => {
  describe('Json converter', () => {
    it('should return company details in string format to Json format', () => {
      const detailsInJson = ([{ companyId: '95b5a067-808a-44a9-a490-b4ef8a045f61', sector: 'Automobile' }]);
      const result = utitlity.makeJson('company_id,company_sector\n95b5a067-808a-44a9-a490-b4ef8a045f61,Automobile');
      expect(result).toEqual(detailsInJson);
    });
    it('should return an empty array when string has no detail related to company', () => {
      const detailsInJson = [];
      const result = utitlity.makeJson('company_id,company_sector');
      expect(result).toEqual(detailsInJson);
    });
  });
  describe('getDetailById', () => {
    it('should return company details in string format by company Id', async () => {
      const companyDetail = '95b5a067-808a-44a9-a490-b4ef8a045f61,Automobile';
      jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
        text: () => Promise.resolve(companyDetail)
      }));
      const result = await utitlity.getDetailById('95b5a067-808a-44a9-a490-b4ef8a045f61');
      expect(result).toEqual(companyDetail);
    });
    it('should return an empty string when company Id is not found', async () => {
      const companyDetail = '';
      jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
        text: () => Promise.resolve(companyDetail)
      }));
      const result = await utitlity.getDetailById('95b5a067-808a-44a9-a490-b4ef8a045f61');
      expect(result).toEqual(companyDetail);
    });
  });

  describe('getDetailBySector', () => {
    it('should return company details in string format by company sector', async () => {
      const companyDetail = '95b5a067-808a-44a9-a490-b4ef8a045f61,Automobile';
      jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
        text: () => Promise.resolve(companyDetail)
      }));
      const result = await utitlity.getDetailBySector('Automobile');
      expect(result).toEqual(companyDetail);
    });
    it('should return an empty string when company sector is not found', async () => {
      const companyDetail = '';
      jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
        text: () => Promise.resolve(companyDetail)
      }));
      const result = await utitlity.getDetailBySector('Automobile');
      expect(result).toEqual(companyDetail);
    });
  });
  describe('calculateScore', () => {
    it('should return score of a company by company Id and sector ', () => {
      const score = 52.75;
      const result = utitlity.calculateScore('95b5a067-808a-44a9-a490-b4ef8a045f61', [{ companyId: '95b5a067-808a-44a9-a490-b4ef8a045f61', performanceIndex: [{ value: 10 }, { value: 10000 }, { value: 10 }, { value: 10 }] }]);
      expect(result).toEqual(score);
    });
    it('should return 0 when company Id is not found', () => {
      const score = 0;
      const result = utitlity.calculateScore('95b5a067-808a-44a9-a490-b4ef8a045f61', [{ companyId: '95b5a067-808a-44a9-a490-b4ef8a045f62', performanceIndex: [{ value: 10 }, { value: 10000 }, { value: 10 }, { value: 10 }] }]);
      expect(result).toEqual(score);
    });
  });

});