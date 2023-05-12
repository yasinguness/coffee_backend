const Joi = require("joi");

const createCustomerSchema = Joi.object({
  name: Joi.string().required().min(3).max(50),
  qrNo: Joi.string().required(),
});

module.exports = { createCustomerSchema };
