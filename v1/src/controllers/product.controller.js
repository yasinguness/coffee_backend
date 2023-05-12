const httpStatus = require("http-status");
const ApiError = require("../responses/error.response");
const successResponse = require("../responses/success.response");
const productService = require("../services/product.service");

class Product {
  create(req, res, next) {
    productService
      .create(req.body)
      .then((response) => {
        successResponse(res, httpStatus.CREATED, response);
      })
      .catch((err) => {
        next(new ApiError(err.message, httpStatus.BAD_REQUEST));
      });
  }

  list(req, res, next) {
    productService
      .list()
      .then((response) => {
        successResponse(res, httpStatus.OK, response);
      })
      .catch((err) => {
        next(new ApiError(err.message, httpStatus.BAD_REQUEST));
      });
  }

  getSweet(req, res, next) {
    productService
      .list({ isSweet: "sweet" })
      .then((response) => {
        successResponse(res, httpStatus.OK, response);
      })
      .catch((err) => {
        next(new ApiError(err.message, httpStatus.BAD_REQUEST));
      });
  }

  getCoffee(req, res, next) {
    productService
      .list({ isSweet: "coffee" })
      .then((response) => {
        successResponse(res, httpStatus.OK, response);
      })
      .catch((err) => {
        next(new ApiError(err.message, httpStatus.BAD_REQUEST));
      });
  }
}

module.exports = new Product();
