const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const config = require("./config/index");
const loaders = require("./loaders/index");
const { userRoutes, cafeRoutes, productRoutes, employeeRoutes, customerRoutes, orderRoutes, orderDetailRoutes } = require("./api-routes");
const errorHandler = require("./middlewares/error-handler.middleware");
const ApiError = require("./responses/error.response");
const httpStatus = require("http-status");

config();
loaders();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

app.listen(process.env.PORT || 5000, () => {
  console.log(`SERVER ${process.env.PORT} PORTUNDA ÇALIŞIYOR.`);
  app.use("/users", userRoutes);
  app.use("/cafe", cafeRoutes);
  app.use("/employee", employeeRoutes);
  app.use("/product", productRoutes);
  app.use("/customer", customerRoutes);
  app.use("/order", orderRoutes);
  app.use("/order-detail", orderDetailRoutes);

  app.use((req, res, next) => {
    next(new ApiError("Aradığınız sayfa bulunmamaktadır!", httpStatus.NOT_FOUND));
  });

  app.use(errorHandler);
});
