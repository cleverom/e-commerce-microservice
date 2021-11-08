import Joi from "joi";

 const requestObject = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]+$")).required(),
});

export default requestObject