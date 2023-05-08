const httpStatus = require("http-status");
const ApiError = require("../responses/error.response");

const authorization = (req, res, next) => {
  if (!req.user_id) {
    return new ApiError("Böyle bir kullanıcı bulunamadı", httpStatus.BAD_REQUEST);
  }

  if (!req.isAdmin) {
    return new ApiError("Bu işlemi admin olanlar yapabilir", httpStatus.BAD_REQUEST);
  }
  next();
};

module.exports = authorization;

// const httpStatus = require("http-status");
// const User = require("../models/User");
// const ApiError = require("../responses/error.response");

// const verifyAndAuthorizationToken = (roles) => async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user_id);
//     console.log("user", user);

//     const role = roles.every((item) => item.includes(user.role));
//     if (role) {
//       next();
//     } else {
//       return next(new ApiError("You don't have permission for this action", httpStatus.FORBIDDEN));
//     }
//   } catch (error) {
//     return next(new ApiError(error.message, httpStatus.BAD_REQUEST));
//   }
// };

// module.exports = verifyAndAuthorizationToken;
