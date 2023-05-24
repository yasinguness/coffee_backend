const Joi = require("joi");

const createOrderDetailSchema = Joi.object({
quantity: Joi.number()
});

const updateOrderDetailSchema = Joi.object({
    quantity: Joi.number()
    });

module.exports = { createOrderDetailSchema, updateOrderDetailSchema};
