const httpStatus = require("http-status");
const ApiError = require("../responses/error.response");
const successResponse = require("../responses/success.response");
const customerService = require("../services/customer.service");

class Customer {
  async createCustomer(req, res, next) {
    try {
      const { name, qrNo } = req.body;

      const customer = await customerService.create({ name, qrNo });

      successResponse(res, httpStatus.CREATED, customer);
    } catch (error) {
      next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }

  async list(req, res, next) {
    try {

      const customer = await customerService.list();

      successResponse(res, httpStatus.CREATED, customer);
    } catch (error) {
      next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }

  async getCustomerById(req, res, next) {
    try {
      const { id } = req.params;

      const customer = await customerService.findById(id);

      if (!customer) {
        throw new Error("Customer not found");
      }

      successResponse(res, httpStatus.OK, customer);
    } catch (error) {
      next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }
  }
}

module.exports = new Customer();
