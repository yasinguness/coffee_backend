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

  deleteProduct(req, res, next) {
    productService
      .delete(req.params.id)
      .then((response) => {
        successResponse(res, httpStatus.OK, { message: "Ürün silindi", productId: response._id });
      })
      .catch((err) => {
        return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
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

  update(req, res, next) {
    const product = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      size: req.body.size,
      isSweet: req.body.isSweet,
      quantitiy: req.body.quantitiy,
    };
    productService
      .update(req.params.productId, product)
      .then((response) => {
        if (!response) {
          return next(new ApiError("Product not found", httpStatus.BAD_REQUEST));
        }
        successResponse(res, httpStatus.OK, { message: "Updated product", product: response });
      })
      .catch((err) => {
        return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
      });
  }
}

module.exports = new Product();
