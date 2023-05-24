const mongoose = require('mongoose');

const OrderDetailSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'order',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true
    }
  },
  { timestamps: true, versionKey:false }
);

const OrderDetail = mongoose.model('orderDetail', OrderDetailSchema);

module.exports = OrderDetail;
