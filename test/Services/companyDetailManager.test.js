const companyDetailManager = require('../../src/Services/companyDetailManager');
const utitlity = require('../../src/Utils/companyUtilities');
describe('Service:  companyDetailManager', () => {

  describe('Tests for posting the details of company', () => {

    it('should return the list of company details after saving them when url have correct data', async () => {
      const mockReq = 'www.abc.com';
      const mockRes1 = [{ companyId: '95b5a067-808a-44a9-a490-b4ef8a045f61', sector: 'Automobile' }];
      const mockRes2 = [{ 'id': '123abc', 'companyName': 'ABC' }];

      jest.spyOn(utitlity, 'fetchDetails').mockResolvedValue(mockRes1);
      jest.spyOn(utitlity, 'getCompanyDetails').mockResolvedValue(mockRes2);

      const result = await companyDetailManager.saveDetail(mockReq);
      expect(result).toEqual(mockRes2);
    });
    it('should return an empty array when url have no data', async () => {
      const mockReq = 'www.abc.com';
      const mockRes1 = [];
      const mockRes2 = [];

      jest.spyOn(utitlity, 'fetchDetails').mockResolvedValue(mockRes1);
      jest.spyOn(utitlity, 'getCompanyDetails').mockResolvedValue(mockRes2);

      const result = await companyDetailManager.saveDetail(mockReq);
      expect(result).toEqual(mockRes2);
    });

  });
  describe('Tests for getting the details of company by sector', () => {
    it('should return company details when sector is correct', async () => {
      const mockReq = 'Healthcare';
      const mockRes = [];
      const result = await companyDetailManager.getBySector(mockReq);
      expect(result).toEqual(mockRes);
    });
    it('should return an empty array when the sector is correct but there is no company in that sector', async () => {
      const mockReq = 'Random';
      const mockRes = [];
      const result = await companyDetailManager.getBySector(mockReq);
      expect(result).toEqual(mockRes);
    });
  });
});