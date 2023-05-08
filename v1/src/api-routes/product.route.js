const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate.middleware");
const validationSchema = require("../validations/product.validation");
const productController = require("../controllers/product.controller");

router.route("/create").post(validate(validationSchema.createProductSchema), productController.create);
router.route("/").get(productController.list);

module.exports = router;
