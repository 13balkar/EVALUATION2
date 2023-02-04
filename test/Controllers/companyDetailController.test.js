const HttpErrors = require('../../Errors/httpErrors');
const companyDetailManager = require('../../src/Services/companyDetailManager');
const companyDetailController = require('../../src/Controllers/companyDetailController');


describe('companyDetailController', () => {
  describe('Tests for posting the details of company', () => {
    it('should return 200 status code and company details when urlLink is correct', async () => {
      jest.spyOn(companyDetailManager, 'saveDetail').mockResolvedValue([{ 'id': '123abc', 'companyName': 'ABC' }]);
      const mockReq = { body: { 'urlLink': 'https://store-0001.s3.amazonaws.com/input.csv' } };
      const mockRes = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };
      await companyDetailController.saveDetail(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.status().json).toBeCalledWith([{ 'id': '123abc', 'companyName': 'ABC' }]);

    });
    it('should return 400 status code and error message when urlLink is incorrect', async () => {
      jest.spyOn(companyDetailManager, 'saveDetail').mockRejectedValue(new HttpErrors({ 'message': 'Invalid urlLink.' }, 400));
      const mockReq = { body: { urlLink: 'https://store-0001.s3.amazonaws.com/input.csv' } };
      const mockRes = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };
      await companyDetailController.saveDetail(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(400);
      expect(mockRes.status().json).toBeCalledWith({ 'message': 'Invalid urlLink.' });
    });
    it('should return 500 status code and error message when urlLink is correct but there is some error in server', async () => {
      jest.spyOn(companyDetailManager, 'saveDetail').mockRejectedValue(new Error('Internal server error.'));
      const mockReq = { body: { urlLink: 'https://store-0001.s3.amazonaws.com/input.csv' } };
      const mockRes = { status: jest.fn().mockReturnValue({ send: jest.fn() }) };
      await companyDetailController.saveDetail(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.status().send).toBeCalledWith({ 'message': 'Internal server error.' });
    });

  });
  describe('Tests for getting the details of company by sector', () => {
    it('should return 200 status code and company details when sector is correct', async () => {
      jest.spyOn(companyDetailManager, 'getBySector').mockResolvedValue([{ 'id': '123abc', 'companyName': 'ABC' }]);
      const mockReq = { query: { 'sector': 'IT' } };
      const mockRes = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };
      await companyDetailController.getBySector(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.status().json).toBeCalledWith([{ 'id': '123abc', 'companyName': 'ABC' }]);
    });
    it('should return 400 status code and error message when you look for wrong sector', async () => {
      jest.spyOn(companyDetailManager, 'getBySector').mockRejectedValue(new HttpErrors({ 'message': 'Invalid sector.' }, 400));
      const mockReq = { query: { 'sector': 'IT' } };
      const mockRes = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };
      await companyDetailController.getBySector(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(400);
      expect(mockRes.status().json).toBeCalledWith({ 'message': 'Invalid sector.' });
    });
    it('should return 500 status code and error message when sector is correct but there is some error in server', async () => {
      jest.spyOn(companyDetailManager, 'getBySector').mockRejectedValue(new Error('Internal server error.'));
      const mockReq = { query: { 'sector': 'IT' } };
      const mockRes = { status: jest.fn().mockReturnValue({ send: jest.fn() }) };
      await companyDetailController.getBySector(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.status().send).toBeCalledWith({ 'message': 'Internal server error.' });
    });

  });
});