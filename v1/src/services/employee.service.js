const BaseService = require("./base.service");
const BaseModel = require("../models/Employee");

class EmployeeService extends BaseService {
  constructor() {
    super(BaseModel);
  }
}

module.exports = new EmployeeService();
