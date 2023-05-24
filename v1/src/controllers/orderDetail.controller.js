const httpStatus = require('http-status');
const ApiError = require('../responses/error.response');
const successResponse = require('../responses/success.response');
const orderDetailService = require('../services/orderDetail.service');

class OrderDetail {
  async create(req, res, next) {
    try {
      const orderDetail = await orderDetailService.create(req.body);
      successResponse(res, httpStatus.CREATED, orderDetail);
    } catch (error) {
      next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }

  async getById(req, res, next) {
    try {
      const orderDetail = await orderDetailService.getById(req.params.id);
      successResponse(res, httpStatus.OK, orderDetail);
    } catch (error) {
      next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }
  }

  async update(req, res, next) {
    try {
      const orderDetail = await orderDetailService.update(req.params.id, req.body);
      successResponse(res, httpStatus.OK, orderDetail);
    } catch (error) {
      next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }
  }

  async delete(req, res, next) {
    try {
      const orderDetail = await orderDetailService.delete(req.params.id);
      successResponse(res, httpStatus.OK, { message: 'Order detail deleted', orderDetailId: req.params.id });
    } catch (error) {
      next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }
  }

  // Diğer özelleştirilmiş fonksiyonları buraya ekleyebilirsiniz.

}

module.exports = new OrderDetail();
