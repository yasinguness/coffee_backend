const express = require("express");
const router = express.Router();

const authenticateToken = require("../middlewares/authenticate.middleware");
const validate = require("../middlewares/validate.middleware");
const validationSchema = require("../validations/user.validation");
const userController = require("../controllers/user.controller");

//User Login-Register
router.route("/register").post(validate(validationSchema.registerSchema), userController.create);
router.route("/login").post(validate(validationSchema.loginSchema), userController.login);
router.route("/profile").get( authenticateToken,userController.getProfile);
router.route("/change-password").put(authenticateToken, validate(validationSchema.changePasswordSchema), userController.changePassword);
router.route("/change-email").put(authenticateToken,validate(validationSchema.changeEmailSchema), userController.changeEmail);
router.route("/").get(userController.getUser);

module.exports = router;
