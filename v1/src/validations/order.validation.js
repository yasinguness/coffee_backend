const Joi = require("joi");

const createOrderSchema = Joi.object({
  customer: Joi.string().length(24).hex().required(),
  products: Joi.array().items(Joi.string().length(24).hex().required()),
  status: Joi.string(),
});

module.exports = { createOrderSchema };
