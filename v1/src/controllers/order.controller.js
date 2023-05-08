const httpStatus = require("http-status");
const ApiError = require("../responses/error.response");
const successResponse = require("../responses/success.response");
const orderService = require("../services/order.service");
const customerService = require("../services/customer.service");

class Order {
  create(req, res, next) {
    orderService
      .create(req.body)
      .then((response) => {
        successResponse(res, httpStatus.CREATED, response);

        customerService
          .update(req.body.customer, { $push: { orders: response } })
          .then((response) => {
            response.save();
          })
          .catch((err) => {
            next(new ApiError(err.message, httpStatus.BAD_REQUEST));
          });
      })
      .catch((err) => {
        next(new ApiError(err.message, httpStatus.BAD_REQUEST));
      });
  }
}

module.exports = new Order();
