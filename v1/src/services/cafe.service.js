const BaseService = require("./base.service");
const BaseModel = require("../models/Cafe");

class CafeService extends BaseService {
  constructor() {
    super(BaseModel);
  }
}

module.exports = new CafeService();
