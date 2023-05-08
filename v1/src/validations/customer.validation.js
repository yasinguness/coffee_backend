const Joi = require("joi");

const createCustomerSchema = Joi.object({
  name: Joi.string().required().min(3).max(50),
  qrNo: Joi.string().required().min(3).max(100),
  phone: Joi.string().required().max(10).min(10),
});

module.exports = { createCustomerSchema };
