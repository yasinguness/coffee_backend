const express = require("express");
const router = express.Router();
const orderStatisticController = require("../controllers/orderStatistics.controller");

router.route("/get-statistics").get(orderStatisticController.updateOrderStatistics);
module.exports = router;
