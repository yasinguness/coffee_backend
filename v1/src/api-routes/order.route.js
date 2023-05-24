const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate.middleware");
const validationSchema = require("../validations/order.validation");
const orderController = require("../controllers/order.controller");

router.route("/create").post(validate(validationSchema.createOrderValidator), orderController.createOrder);
router.route("/get-order").get(orderController.list);
router.route("/:id").get(orderController.getOrderById);
router.route("/update-order/:id").put(orderController.updateOrderStatus);
router.route("/delete-order/:id").delete(orderController.deleteOrder);

module.exports = router;
