const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
    orderDetails: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderDetail",
      },
    ],
    status: {
      type: String,
      enum: ["pending", "in progress", "completed"],
      default: "pending",
    },
    totalPrice: {
      type: Number,
      required: true
    },
  },
  { timestamps: true, versionKey: false }
);

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;
