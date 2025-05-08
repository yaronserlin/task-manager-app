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

// const createTaskSchema = Joi.object({
//     title: Joi.string().min(1).required(),
//     description: Joi.string().allow('').optional(),
//     isComplete: Joi.boolean().optional(),
//     dueDate: Joi.date().optional(),
//     category: Joi.string().valid('work', 'personal', 'urgent', 'other').optional(),
//     priority: Joi.number().integer().min(1).max(5).optional()
// });

// const updateTaskSchema = createTaskSchema.min(1);

// module.exports = { createTaskSchema, updateTaskSchema };