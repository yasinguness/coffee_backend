const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      min: 3,
      max: 50,
    },
    qrNo: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 100,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const Customer = mongoose.model("customer", CustomerSchema);

module.exports = Customer;
