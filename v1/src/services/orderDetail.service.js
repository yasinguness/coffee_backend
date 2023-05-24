const BaseService = require("./base.service");
const BaseModel = require("../models/OrderDetail");

class OrderDetailService extends BaseService {
  constructor() {
    super(BaseModel);
  }
/*   async create(data) {
    try {
      const orderDetail = await this.model.create(data);
      return orderDetail;
    } catch (error) {
      throw new Error('Failed to create order detail');
    }
  } */

  async getById(id) {
    try {
      const orderDetail = await this.model.findById(id);
      if (!orderDetail) {
        throw new Error('Order detail not found');
      }
      return orderDetail;
    } catch (error) {
      throw new Error('Failed to get order detail');
    }
  }

  async update(id, data) {
    try {
      const orderDetail = await this.model.findByIdAndUpdate(id, data, { new: true });
      if (!orderDetail) {
        throw new Error('Order detail not found');
      }
      return orderDetail;
    } catch (error) {
      throw new Error('Failed to update order detail');
    }
  }

  async delete(id) {
    try {
      const orderDetail = await this.model.findByIdAndRemove(id);
      if (!orderDetail) {
        throw new Error('Order detail not found');
      }
      return orderDetail;
    } catch (error) {
      throw new Error('Failed to delete order detail');
    }
  }

 /*  async findByIdAndUpdate(orderDetailId, updateData) {
    try {
      const updatedOrderDetail = await this.model.findByIdAndUpdate(
        orderDetailId,
        updateData,
        { new: true }
      );
      return updatedOrderDetail;
    } catch (error) {
      throw new Error("OrderDetail update failed.");
    }
  } */
  
}

module.exports = new OrderDetailService();
