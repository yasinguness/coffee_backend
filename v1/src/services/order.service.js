const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Product = require('../models/Product');
const BaseService = require("./base.service");
const { Console } = require('winston/lib/winston/transports');

class OrderService extends BaseService {
  constructor() {
    super(Order);
  }

  async create(customerId, products) {
    const groupedProducts = this.groupProducts(products);
    const totalPrice = await this.calculateTotalPrice(groupedProducts);

    const order = new Order({
      customer: customerId,
      products: groupedProducts,
      status: 'pending',
      totalPrice: totalPrice,
    });

    await order.save();

    // Customer'a oluşturulan siparişi ekleyin
    await Customer.findByIdAndUpdate(customerId, { $push: { orders: order._id } });

    return order;
  }

  groupProducts(products) {
    const groupedProducts = [];

    for (const product of products) {
      const existingProductIndex = this.findIndex(groupedProducts, (p) => p.product.toString() === product.product.toString());

      if (existingProductIndex !== -1) {
        groupedProducts[existingProductIndex].amount += product.amount;
      } else {
        groupedProducts.push({
          product: product.product,
          amount: product.amount,
          currentPrice: product.currentPrice, 
          selectedSize: product.selectedSize,
        });
      }
    }

    return groupedProducts;
  }

  async calculateTotalPrice(products) {
    let totalPrice = 0;

    for (const product of products) {
      const { product: productId, amount ,currentPrice } = product;
      const existingProduct = await Product.findById(productId).exec();

      if (!existingProduct) {
        throw new Error('Invalid product');
      }

      totalPrice +=currentPrice * amount;
    }

    return totalPrice;
  }

  async getOrderList() {
    return this.list().populate('customer').populate('products.product', 'name price image');
  }

   async getPendingOrders() {
    try {
      const pendingOrders = await Order.find({ status: "pending" }).populate("customer").populate('products.product', 'name price image');
      return pendingOrders;
    } catch (error) {
      throw new Error("Error retrieving pending orders");
    }
  }

}

module.exports = new OrderService();
