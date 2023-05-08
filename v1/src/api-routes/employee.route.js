const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate.middleware");
const validationSchema = require("../validations/employee.validation");
const employeeController = require("../controllers/employee.controller");

router.route("/create").post(validate(validationSchema.createEmployeeSchema), employeeController.create);

module.exports = router;
