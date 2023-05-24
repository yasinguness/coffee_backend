const Joi = require("joi");

const createOrderValidator = Joi.object({
  customer: Joi.string().required().messages({
    "any.required": "Customer ID is required",
  }),
  orderDetails: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
        price: Joi.number().positive().required(),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.min": "Order details must contain at least one item",
      "any.required": "Order details is required",
    }),
  totalPrice: Joi.number().positive().required().messages({
    "any.required": "Total price is required",
    "number.base": "Total price must be a numeric value",
  }),
  status: Joi.string().valid("pending", "in progress", "completed").optional().messages({
    "any.only": "Invalid status value",
  }),
});

exports.validate = (req, res, next) => {
  const { error } = createOrderValidator.validate(req.body);
  if (!error) {
    return next();
  }

  const errors = error.details.reduce((acc, { path, message }) => {
    return { ...acc, [path[0]]: message };
  }, {});

  return res.status(422).json({ errors });
};


module.exports = { createOrderValidator };
//TODO:Burada sorun olabilir , orderDetailsda