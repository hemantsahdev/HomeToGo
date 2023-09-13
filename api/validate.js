const Joi = require("@hapi/joi");


const validateUser = (data) => {

    const schema = Joi.object({

        name: Joi.string().required().min(3),
        email: Joi.string().required(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data);
}


module.exports={validateUser};