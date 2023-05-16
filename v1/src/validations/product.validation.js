const Joi = require("joi");

const createProductSchema = Joi.object({
  name: Joi.string().required().min(3).max(50),
  description: Joi.string().min(6).max(255),
  price: Joi.number().required(),
  size: Joi.string(),
  isSweet: Joi.string().required(),
  quantitiy:Joi.number()
});

module.exports = { createProductSchema };
