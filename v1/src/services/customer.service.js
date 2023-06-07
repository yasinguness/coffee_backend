const BaseService = require("./base.service");
const BaseModel = require("../models/Customer");

class CustomerService extends BaseService {
  constructor() {
    super(BaseModel);
  }

  async deleteAll(){
    try {
      await BaseModel.deleteMany();
    } catch (error) {
      throw new Error("Failed to delete all customers")
    }
  }
}

module.exports = new CustomerService();
