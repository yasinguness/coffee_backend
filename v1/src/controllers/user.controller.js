const httpStatus = require("http-status");
const { passwordToHash, generateAccessToken } = require("../scripts/utils/helper");
const ApiError = require("../responses/error.response");
const {successResponse,errorResponse} = require("../responses/success.response");
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

  getUser(req, res, next) {
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
  getProfile(req, res, next) {
    
    userService
      .findById(req.userId)
      .then((response) => {
        successResponse(res, httpStatus.OK, response);
      })
      .catch((err) => {
        next(new ApiError(err.message, httpStatus.NOT_FOUND));
      });
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const hashedPassword = passwordToHash(password);

      const user = await userService.findOne({ email, password: hashedPassword });

      if (!user) {
        return next(new ApiError("Invalid email or password", httpStatus.BAD_REQUEST));
      }

      const token = generateAccessToken(user);

      successResponse(res, httpStatus.OK, token);
    } catch (error) {
      return next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }

async  changePassword(req, res, next) {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    // Kullanıcıyı veritabanından alın
    const user = await userService.findById(userId);

    // Eski şifre kontrolü
    if (user.password !== oldPassword) {
      next(new ApiError("Eski şifre yanlış", httpStatus.NOT_FOUND));
    }

    // Yeni şifreyi güncelle
    user.password = newPassword;
    await user.save();

successResponse(res,httpStatus.OK, user);
  } 

catch (error) {
    next(new ApiError(error.message, httpStatus.NOT_FOUND));
  }
}

// E-posta değiştirme işlemi
async  changeEmail(req, res, next) {
  try {
    const { userId, newEmail } = req.body;

    // Kullanıcıyı veritabanından alın
    const user = await userService.findById(userId);

    // Yeni e-postayı güncelle
    user.email = newEmail;
    await user.save();

    successResponse(res,httpStatus.OK, user);
  } catch (error) {
    next(new ApiError(error.message, httpStatus.NOT_FOUND));
  }
}

}

module.exports = new User();
