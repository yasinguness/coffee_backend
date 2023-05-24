const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate.middleware");
const validationSchema = require("../validations/orderDetail.validation");
const orderDetailController = require("../controllers/orderDetail.controller");

router.route("/create").post(/* validate(validationSchema.createOrderDetailSchema), */ orderDetailController.create);
router.route("/:id").get(orderDetailController.getById);
router.route("/delete-orderDetail/:id").delete(orderDetailController.delete);
router.route("/update-orderdetail/:id").put(/* validate(validationSchema.createProductSchema),  */orderDetailController.update);



module.exports = router;
