const httpStatus = require("http-status");
const { passwordToHash, generateAccessToken } = require("../scripts/utils/helper");
const ApiError = require("../responses/error.response");
const successResponse = require("../responses/success.response");
const userService = require("../services/user.service");

class User {
  create(req, res, next) {
    req.body.password = passwordToHash(req.body.password);
    req.body.isAdmin = false;
    userService
      .create(req.body)
      .then((response) => {
        const user = {
          _id: response._id,
          name: response.name,
          surname: response.surname,
        };

        successResponse(res, httpStatus.CREATED, user);
      })
      .catch((err) => {
        next(new ApiError(err.message, httpStatus.BAD_REQUEST));
      });
  }

  getUsers(req, res, next) {
    const { page = 1, limit = 10 } = req.query;
    userService
      .list(page, limit)
      .then((response) => {
        successResponse(res, httpStatus.OK, response);
      })
      .catch((err) => {
        next(new ApiError(err.message, httpStatus.NOT_FOUND));
      });
  }
}

module.exports = new User();
