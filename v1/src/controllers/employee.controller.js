const httpStatus = require("http-status");
const ApiError = require("../responses/error.response");
const successResponse = require("../responses/success.response");
const employeeService = require("../services/employee.service");

class Employee {
  create(req, res, next) {
    employeeService.create(req.body)
      .then((response) => {
        successResponse(res, httpStatus.CREATED, response);
      })
      .catch((err) => {
        next(new ApiError(err.message, httpStatus.BAD_REQUEST));
      });
  }
}

module.exports = new Employee();
