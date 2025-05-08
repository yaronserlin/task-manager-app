const Joi = require('joi');

const registerSchema = Joi.object({
    firstName: Joi.string().trim().max(50).required(),
    lastName: Joi.string().trim().max(50).required(),
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };


// const Joi = require('joi');

// const registerSchema = Joi.object({
//     name: Joi.string().min(3).max(30).required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().min(8).max(20).pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/).required().messages({
//         'string.pattern.base': 'Password must be 8–20 characters long, contain letters and numbers, and have no spaces or special characters.'
//     }),

// });

// const loginSchema = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().required()
// });

// module.exports = { registerSchema, loginSchema };