const Joi = require('joi');

const createTaskSchema = Joi.object({
    title: Joi.string().min(1).required(),
    description: Joi.string().allow('').optional(),
    isComplete: Joi.boolean().optional(),
    dueDate: Joi.date().optional(),
    category: Joi.string().valid('work', 'personal', 'urgent', 'other').optional(),
    priority: Joi.number().integer().min(1).max(5).optional()
});

const updateTaskSchema = createTaskSchema.min(1);

module.exports = { createTaskSchema, updateTaskSchema };