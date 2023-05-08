const Joi = require("joi");

const createEmployeeSchema = Joi.object({
  name: Joi.string().required().min(3).max(50),
  status: Joi.string(),
});

module.exports = { createEmployeeSchema };
