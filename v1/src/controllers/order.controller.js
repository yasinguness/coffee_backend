const httpStatus = require("http-status");
const ApiError = require("../responses/error.response");
const {successResponse, errorResponse} = require("../responses/success.response");
const orderService = require("../services/order.service");

class Order {
  async createOrder(req, res, next) {
    try {
      const { customer, products } = req.body;

      const order = await orderService.create(customer, products);

      successResponse(res, httpStatus.CREATED,  order);
    } catch (error) {
      next(new ApiError(error.message, 400));
    }
  }


  async getOrder(req, res, next) {
    try {
      const  orderId  = req.params.id;

      const order = await orderService.findById(orderId).populate('customer').populate('products.product', 'name image');

      if(!order){
        throw("Sipariş Bulunamadı");
      }
      successResponse(res, httpStatus.OK, order);
    } catch (error) {
      next(new ApiError(error.message, 400));
    }
  }

  async getOrderList(req, res, next) {
    try {
      const orders = await orderService.getOrderList();

      successResponse(res, 200, orders);
    } catch (error) {
      next(new ApiError(error.message, 400));
    }
  }

  async deleteOrder(req,res,next){
    try {
      const  orderId  = req.params.id;

      const deletedOrder= await orderService.delete(orderId);

            successResponse(res, httpStatus.OK, deletedOrder);

    } catch (error) {
      next(new ApiError(error.message, 400));

    }
  }

   async getPendingOrders(req, res) {
    try {
      const pendingOrders = await orderService.getPendingOrders();
      successResponse(res, httpStatus.OK, pendingOrders);
    } catch (error) {
      errorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }

   async updateOrder(req, res, next) {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      const order = await orderService.findById(orderId);

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      order.status = status;
      await order.save();

      successResponse(res, httpStatus.OK, order);
    } catch (error) {
      errorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }



}

module.exports = new Order();


 