const express = require("express");
const router = express.Router();

const authorization = require("../middlewares/authorization.middleware");
const authenticateToken = require("../middlewares/authenticate.middleware");
const validate = require("../middlewares/validate.middleware");
const validationSchema = require("../validations/user.validation");
const userController = require("../controllers/user.controller");

//User Login-Register
router.route("/register").post(validate(validationSchema.registerSchema), userController.create);
router.route("/", userController.getUser);

module.exports = router;
