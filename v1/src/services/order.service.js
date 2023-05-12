const BaseService = require("./base.service");
const BaseModel = require("../models/Order");

class OrderService extends BaseService {
  constructor() {
    super(BaseModel);
  }

  list(page, limit, where) {
    const allOrders = BaseModel.find(where || {})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate({
        path: "customer",
        select: "name qrNo",
      })
      .populate({
        path: "products",
      });

    return allOrders;
  }
}

module.exports = new OrderService();
