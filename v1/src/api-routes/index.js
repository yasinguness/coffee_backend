const userRoutes = require("./user.route");
const cafeRoutes = require("./cafe.route");
const productRoutes = require("./product.route");
const employeeRoutes = require("./employee.route");
const customerRoutes = require("./customer.route");
const orderRoutes = require("./order.route");
const orderStatisticRoutes= require("./orderStatistic.route")

module.exports = {
  userRoutes,
  cafeRoutes,
  productRoutes,
  employeeRoutes,
  customerRoutes,
  orderRoutes, orderStatisticRoutes
};
