const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
    products: [
      {
        amount:{
            type:Number,
            default:1
        },
        selectedSize: {
          type:String,
          default:"M"
        } ,
        currentPrice:{ type:Number},
        product:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        }
      }
    ],
    status: {
      type: String,
      enum: ["pending", "in progress", "completed"],
      default: "pending",
    },
    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true, versionKey: false }
);

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;
