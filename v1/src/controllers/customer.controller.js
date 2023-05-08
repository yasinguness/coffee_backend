const httpStatus = require("http-status");
const ApiError = require("../responses/error.response");
const successResponse = require("../responses/success.response");
const customerService = require("../services/customer.service");

class Customer {
  create(req, res, next) {
    customerService
      .create(req.body)
      .then((response) => {
        successResponse(res, httpStatus.CREATED, response);
      })
      .catch((err) => {
        next(new ApiError(err.message, httpStatus.BAD_REQUEST));
      });
  }

  list(req, res, next) {
    customerService
      .list({})
      .then((response) => {
        successResponse(res, httpStatus.OK, response);
      })
      .catch((err) => {
        next(new ApiError(err.message, httpStatus.BAD_REQUEST));
      });
  }
}

module.exports = new Customer();
