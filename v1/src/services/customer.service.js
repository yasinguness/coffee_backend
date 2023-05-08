const BaseService = require("./base.service");
const BaseModel = require("../models/Customer");

class CustomerService extends BaseService {
  constructor() {
    super(BaseModel);
  }
}

module.exports = new CustomerService();
