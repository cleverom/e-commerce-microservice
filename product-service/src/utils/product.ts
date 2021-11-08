import Joi from "joi";

 const requestObject = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
});

export default requestObject