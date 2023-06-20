const mongoose = require("mongoose");

const OrderStatisticsSchema = new mongoose.Schema(
  {
    mostOrderedCoffee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    mostOrderedCoffeeAmount: {
        type: Number,
        default: 0,
      },
    mostOrderedDessert: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    mostOrderedDessertAmount: {
        type: Number,
        default: 0,
      },
    dailyTotalOrderAmount: {
      type: Number,
      default: 0,
    },
    totalCoffeeOrders: {
      type: Number,
      default: 0,
    },
    totalDessertOrders: {
      type: Number,
      default: 0,
    },
    totalOrderAmount:{
      type:Number, 
      default:0
    }
  },
  { timestamps: true, versionKey: false }
);

const OrderStatistics = mongoose.model(
  "orderStatistics",
  OrderStatisticsSchema
);

module.exports = OrderStatistics;
