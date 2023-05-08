const BaseService = require("./base.service");
const BaseModel = require("../models/Product");

class ProductService extends BaseService {
  constructor() {
    super(BaseModel);
  }
}

module.exports = new ProductService();
