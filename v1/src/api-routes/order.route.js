const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate.middleware");
const validationSchema = require("../validations/order.validation");
const orderController = require("../controllers/order.controller");

router.route("/create").post(validate(validationSchema.createOrderSchema), orderController.create);
router.route("/get-order").get(orderController.list);

module.exports = router;
