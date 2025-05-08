/**
 * Auth routes
 * -----------
 * Handles user registration, login, and profile retrieval.
 */


const { registerUser, loginUser, getMe, } = require('../controllers/authController');
const validate = require('../middleware/validateMiddleware');
const protect = require('../middleware/authMiddleware');
const { registerSchema, loginSchema, } = require('../validators/authValidator');


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User registration & login
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, email, password]
 *             properties:
 *               firstName: { type: string, example: Demo }
 *               lastName:  { type: string, example: User }
 *               email:     { type: string, example: demo@mail.com }
 *               password:  { type: string, example: Passw0rd! }
 *     responses:
 *       201: { description: User created, content: { application/json: { schema: { $ref: '#/components/schemas/AuthSuccess' } } } }
 *       400: { $ref: '#/components/responses/ValidationError' }
 *
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Log in and receive a JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:    { type: string, example: demo@mail.com }
 *               password: { type: string, example: Passw0rd! }
 *     responses:
 *       200: { description: Login successful, content: { application/json: { schema: { $ref: '#/components/schemas/AuthSuccess' } } } }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *
 * /api/auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get the logged-in user profile
 *     security: [ { BearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: User profile
 *         content: { application/json: { schema: { $ref: '#/components/schemas/AuthSuccess' } } }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 */
const router = require('express').Router();

/** @route POST /api/auth/register */
router.post('/register', validate(registerSchema), registerUser);

/** @route POST /api/auth/login */
router.post('/login', validate(loginSchema), loginUser);

/** @route GET /api/auth/me */
router.get('/me', protect, getMe);

module.exports = router;