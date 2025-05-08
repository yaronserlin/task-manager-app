const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Manager API',
            version: '1.0.0',
            description:
                'JWT-protected CRUD for users, projects & tasks (Node/Express + MongoDB)',
        },
        servers: [
            {
                url: 'http://localhost:5000',   // dev
                description: 'Local server',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                /** ----------  AUTH ---------- */
                AuthSuccess: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '65e9a3b4f4f6a57c1e4c2c1d' },
                        email: { type: 'string', example: 'demo@mail.com' },
                        firstName: { type: 'string', example: 'Demo' },
                        lastName: { type: 'string', example: 'User' },
                        token: { type: 'string', example: 'eyJhbGc…' },
                    },
                },
                /** ----------  PROJECT ---------- */
                Project: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        color: { type: 'string', example: '#3B82F6' },
                        owner: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                /** ----------  TASK ---------- */
                Task: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        completed: { type: 'boolean' },
                        owner: { type: 'string' },
                        project: { type: 'string', nullable: true },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                /** ----------  ERROR ---------- */
                Error: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        details: { type: 'array', items: { type: 'string' } },
                    },
                },
            },
            responses: {
                Unauthorized: {
                    description: 'Missing or invalid JWT',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
                },
                NotFound: {
                    description: 'Resource not found',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
                },
                ValidationError: {
                    description: 'Request validation failed',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
                },
            },
        },
        security: [{ BearerAuth: [] }],
    },
    // globs where swagger-jsdoc will find JSDoc blocks
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = (app) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};


// const swaggerJSDoc = require('swagger-jsdoc');

// const options = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'Task Manager API',
//             version: '1.0.0',
//             description: 'API documentation for Task Manager'
//         },
//         servers: [
//             { url: `http://localhost:${process.env.PORT || 5000}` }
//         ],
//         components: {
//             securitySchemes: {
//                 bearerAuth: {
//                     type: 'http',
//                     scheme: 'bearer',
//                     bearerFormat: 'JWT'
//                 }
//             },
//             schemas: {
//                 User: {
//                     type: 'object',
//                     properties: {
//                         _id: { type: 'string', description: 'User ID' },
//                         name: { type: 'string' },
//                         email: { type: 'string' },
//                         createdAt: { type: 'string', format: 'date-time' }
//                     }
//                 },
//                 Task: {
//                     type: 'object',
//                     properties: {
//                         _id: { type: 'string' },
//                         owner: { type: 'string' },
//                         title: { type: 'string' },
//                         description: { type: 'string' },
//                         isComplete: { type: 'boolean' },
//                         dueDate: { type: 'string', format: 'date-time' },
//                         category: { type: 'string', enum: ['work', 'personal', 'urgent', 'other'] },
//                         priority: { type: 'integer', minimum: 1, maximum: 5 },
//                         createdAt: { type: 'string', format: 'date-time' },
//                         updatedAt: { type: 'string', format: 'date-time' }
//                     }
//                 },
//                 TaskCreate: {
//                     type: 'object',
//                     required: ['title'],
//                     properties: {
//                         title: { type: 'string' },
//                         description: { type: 'string' },
//                         isComplete: { type: 'boolean' },
//                         dueDate: { type: 'string', format: 'date-time' },
//                         category: { type: 'string', enum: ['work', 'personal', 'urgent', 'other'] },
//                         priority: { type: 'integer', minimum: 1, maximum: 5 }
//                     }
//                 },
//                 TaskUpdate: {
//                     type: 'object',
//                     properties: {
//                         title: { type: 'string' },
//                         description: { type: 'string' },
//                         isComplete: { type: 'boolean' },
//                         dueDate: { type: 'string', format: 'date-time' },
//                         category: { type: 'string', enum: ['work', 'personal', 'urgent', 'other'] },
//                         priority: { type: 'integer', minimum: 1, maximum: 5 }
//                     }
//                 }
//             }
//         },
//         security: [{ bearerAuth: [] }]
//     },
//     apis: ['./src/routes/*.js', './src/models/*.js']
// };

// module.exports = swaggerJSDoc(options);