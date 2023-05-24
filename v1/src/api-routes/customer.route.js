const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customer.controller");
const validate = require("../middlewares/validate.middleware");
const validationSchema = require("../validations/customer.validation");

router.route("/create").post(validate(validationSchema.createCustomerSchema), customerController.createCustomer);
router.route("/").get(customerController.list);
router.route("/:id").get(customerController.getCustomerById);

module.exports = router;
