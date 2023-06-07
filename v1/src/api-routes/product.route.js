const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate.middleware");
const validationSchema = require("../validations/product.validation");
const productController = require("../controllers/product.controller");

router.route("/create").post(validate(validationSchema.createProductSchema), productController.createProduct);
router.route("/search").get(productController.searchProduct);
router.route("/").get(productController.getProductList);
router.route("/sweets").get(productController.getSweet);
router.route("/coffees").get(productController.getCoffee);
router.route("/:id").get(productController.getProductById);
router.route("/delete-product/:id").delete(productController.deleteProduct);
router.route("/update-product/:productId").put(productController.updateProduct);

module.exports = router;
