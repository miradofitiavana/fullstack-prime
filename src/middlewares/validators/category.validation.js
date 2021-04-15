const Joi = require('joi');

exports.validate = function (data) {
    const categorySchemaValidation = Joi.object({
        title: Joi.string().required(),
    });
    return categorySchemaValidation.validate(data);
}