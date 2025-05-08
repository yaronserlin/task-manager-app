const Joi = require('joi');

const projectSchema = Joi.object({
    name: Joi.string().trim().max(100).required(),
    description: Joi.string().trim().max(1000).allow('').optional(),
    color: Joi.string()
        .pattern(/^#(?:[0-9a-fA-F]{3}){1,2}$/)
        .optional(),
});

module.exports = { projectSchema };
