const httpStatus = require("http-status");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { successResponse, errorResponse } = require("../responses/success.response");
const orderStModel=require("../models/OrderStatistic");

class OrderStatistics {
  static async updateOrderStatistics( req, res,next) {
    try {
      // En çok sipariş edilen kahveyi bulma
      const mostOrderedCoffee = await Order.aggregate([
        {
          $unwind: "$products",
        },
        {
          $lookup: {
            from: "products",
            localField: "products.product",
            foreignField: "_id",
            as: "productInfo",
          },
        },
        {
          $unwind: "$productInfo",
        },
        {
          $match: {
            "productInfo.isSweet": "coffee",
          },
        },
        {
          $group: {
            _id: "$products.product",
            orderCount: { $sum: "$products.amount" },
          },
        },
        {
          $sort: {
            orderCount: -1,
          },
        },
        {
          $limit: 1,
        },
      ]);

      const mostOrderedCoffeeProductId = mostOrderedCoffee[0]._id;
      const mostOrderedCoffeeAmount = mostOrderedCoffee[0].orderCount;

      // En çok sipariş edilen tatlıyı bulma
      const mostOrderedDessert = await Order.aggregate([
        {
          $unwind: "$products",
        },
        {
          $lookup: {
            from: "products",
            localField: "products.product",
            foreignField: "_id",
            as: "productInfo",
          },
        },
        {
          $unwind: "$productInfo",
        },
        {
          $match: {
            "productInfo.isSweet": "sweet",
          },
        },
        {
          $group: {
            _id: "$products.product",
            orderCount: { $sum: "$products.amount" },
          },
        },
        {
          $sort: {
            orderCount: -1,
          },
        },
        {
          $limit: 1,
        },
      ]);

      const mostOrderedDessertProductId = mostOrderedDessert[0]._id;
      const mostOrderedDessertAmount = mostOrderedDessert[0].orderCount;

      // Günlük toplam sipariş tutarını bulma
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const dailyTotalOrderAmount = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: today },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$totalPrice" },
          },
        },
      ]);

      const totalCoffeeOrders = await Order.aggregate([
        {
          $unwind: "$products",
        },
        {
          $lookup: {
            from: "products",
            localField: "products.product",
            foreignField: "_id",
            as: "productInfo",
          },
        },
        {
          $unwind: "$productInfo",
        },
        {
          $match: {
            "productInfo.isSweet": "coffee",
          },
        },
        {
          $group: {
            _id: null,
            totalCoffeeOrders: { $sum: "$products.amount" },
          },
        },
      ]);

      const totalDessertOrders = await Order.aggregate([
        {
          $unwind: "$products",
        },
        {
          $lookup: {
            from: "products",
            localField: "products.product",
            foreignField: "_id",
            as: "productInfo",
          },
        },
        {
          $unwind: "$productInfo",
        },
        {
          $match: {
            "productInfo.isSweet": "sweet",
          },
        },
        {
          $group: {
            _id: null,
            totalDessertOrders: { $sum: "$products.amount" },
          },
        },
      ]);
            const totalOrderAmount = await Order.aggregate([
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$totalPrice" },
          },
        },
      ]);

      const orderStatistics = new orderStModel({
        mostOrderedCoffee: mostOrderedCoffeeProductId,
        mostOrderedCoffeeAmount: mostOrderedCoffeeAmount,
        mostOrderedDessert: mostOrderedDessertProductId,
        mostOrderedDessertAmount: mostOrderedDessertAmount,
        dailyTotalOrderAmount: dailyTotalOrderAmount[0]?.totalAmount || 0,
        totalCoffeeOrders: totalCoffeeOrders[0]?.totalCoffeeOrders || 0,
        totalDessertOrders: totalDessertOrders[0]?.totalDessertOrders || 0,
        totalOrderAmount: totalOrderAmount[0]?.totalAmount || 0,

      });

      
      await orderStatistics.save();

     successResponse(res,httpStatus.OK, orderStatistics);
    } catch (error) {
errorResponse(res, httpStatus.BAD_GATEWAY, error.message)  ;  }
  }
}

module.exports = OrderStatistics;
