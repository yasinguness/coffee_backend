const express = require("express");
const router = express.Router();

const CafeController = require("../controllers/cafe.controller");
const validate = require("../middlewares/validate.middleware");
const validationSchema = require("../validations/cafe.validation");

router.route("/create").post(validate(validationSchema.createCafeSchema), CafeController.create);
router.route("/").get(CafeController.list);

module.exports = router;
