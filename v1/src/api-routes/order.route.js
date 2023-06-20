const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate.middleware");
const validationSchema = require("../validations/order.validation");
const orderController = require("../controllers/order.controller");

router.route("/create").post(validate(validationSchema.schema), orderController.createOrder);
router.route("/get-order").get(orderController.getOrderList);
router.route("/pending").get(orderController.getPendingOrders);

router.route("/update/:orderId").put(orderController.updateOrder);
router.route("/:id").get(orderController.getOrder);
//router.route("/update-order/:id").put(orderController.updateOrderStatus);
router.route("/delete-order/:id").delete(orderController.deleteOrder);

module.exports = router;
