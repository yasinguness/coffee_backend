const Joi = require("joi");

const schema = Joi.object({
  customer: Joi.string().required(),
  products: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().required(),
        amount: Joi.number().integer().positive().required(),
selectedSize:Joi.string(), 
currentPrice:Joi.number(),
      })
    )
    .required(),
  totalPrice:Joi.number()  ,
  status:Joi.string(),
});


module.exports = {schema} ;
//TODO:Burada sorun olabilir , orderDetailsda