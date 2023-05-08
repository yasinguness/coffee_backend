const httpStatus = require("http-status");
const ApiError = require("../responses/error.response");
const successResponse = require("../responses/success.response");
const cafeService = require("../services/cafe.service");

class Cafe {
  create(req, res, next) {
    cafeService
      .create(req.body)
      .then((response) => {
        successResponse(res, httpStatus.CREATED, response);
      })
      .catch((err) => {
        next(new ApiError(err.message, httpStatus.BAD_REQUEST));
      });
  }

  list(req, res, next) {
    cafeService
      .list({})
      .then((response) => {
        successResponse(res, httpStatus.OK, response);
      })
      .catch((err) => {
        next(new ApiError(err.message, httpStatus.BAD_REQUEST));
      });
  }
}

module.exports = new Cafe();
