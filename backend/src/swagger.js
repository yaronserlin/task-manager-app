const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Manager API',
            version: '1.0.0',
            description: 'API documentation for Task Manager'
        },
        servers: [
            { url: `http://localhost:${process.env.PORT || 5000}` }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', description: 'User ID' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' }
                    }
                },
                Task: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        owner: { type: 'string' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        isComplete: { type: 'boolean' },
                        dueDate: { type: 'string', format: 'date-time' },
                        category: { type: 'string', enum: ['work', 'personal', 'urgent', 'other'] },
                        priority: { type: 'integer', minimum: 1, maximum: 5 },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' }
                    }
                },
                TaskCreate: {
                    type: 'object',
                    required: ['title'],
                    properties: {
                        title: { type: 'string' },
                        description: { type: 'string' },
                        isComplete: { type: 'boolean' },
                        dueDate: { type: 'string', format: 'date-time' },
                        category: { type: 'string', enum: ['work', 'personal', 'urgent', 'other'] },
                        priority: { type: 'integer', minimum: 1, maximum: 5 }
                    }
                },
                TaskUpdate: {
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        description: { type: 'string' },
                        isComplete: { type: 'boolean' },
                        dueDate: { type: 'string', format: 'date-time' },
                        category: { type: 'string', enum: ['work', 'personal', 'urgent', 'other'] },
                        priority: { type: 'integer', minimum: 1, maximum: 5 }
                    }
                }
            }
        },
        security: [{ bearerAuth: [] }]
    },
    apis: ['./src/routes/*.js', './src/models/*.js']
};

module.exports = swaggerJSDoc(options);