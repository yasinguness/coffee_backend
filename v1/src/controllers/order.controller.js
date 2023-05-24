const httpStatus = require("http-status");
const ApiError = require("../responses/error.response");
const successResponse = require("../responses/success.response");
const orderService = require("../services/order.service");
const productService = require("../services/product.service");
const orderDetailService = require("../services/orderDetail.service");

class Order {
  async create(req, res, next) {
    try {
      const { customer, products } = req.body;

      // Sipariş oluşturma işlemi
      const order = await orderService.create({ customer, products });

      // Ürünlerin stok kontrolü ve güncellenmesi
      for (const productItem of products) {
        const { product, quantity } = productItem;
        await productService.updateStock(product, quantity);
      }

      successResponse(res, httpStatus.CREATED, order);
    } catch (error) {
      next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }

  async createOrder(req, res, next) {
    try {

     
      const { customer, orderDetail, totalPrice, status } = req.body;

      // Yeni bir Order oluşturma
      const order = orderService.create(({
        customer, orderDetail, totalPrice, status
      }));

      successResponse(res, httpStatus.CREATED, order);

      //orderDetailService.update(req.body, { $push: { order: order } });
    } catch (error) {
      next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }

  async getOrderById(req, res, next) {
    try {
      const orderId = req.params.id;

      // Siparişin veritabanından alınması
      const order = await orderService.getById(orderId);

      if (!order) {
        throw new Error("Sipariş bulunamadı");
      }

      successResponse(res, httpStatus.OK, order);
    } catch (error) {
      next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }
  }

  async list(req, res, next) {
    try {

      const order = await orderService.list();

      if (!order) {
        throw new Error("Sipariş bulunamadı");
      }

      successResponse(res, httpStatus.OK, order);
    } catch (error) {
      next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }
  }

  async updateOrderStatus(req, res, next) {
    try {
      const orderId = req.params.id;
      const { status } = req.body;

      // Siparişin güncellenmesi
      const updatedOrder = await orderService.updateStatus(orderId, status);

      successResponse(res, httpStatus.OK, updatedOrder);
    } catch (error) {
      next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }

  async deleteOrder(req, res, next) {
    try {
      const orderId = req.params.id;

      // Siparişin silinmesi
      await orderService.deleteById(orderId);

      successResponse(res, httpStatus.OK, { message: "Sipariş silindi", orderId });
    } catch (error) {
      next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }
}

module.exports = new Order();
