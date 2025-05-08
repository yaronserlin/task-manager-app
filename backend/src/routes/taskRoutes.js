/**
 * Task routes
 * -----------
 * Includes optional project filtering via query strings.
 */

const express = require('express');
const {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');
const protect = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { taskSchema } = require('../validators/taskValidator');


/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: CRUD for tasks
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     tags: [Tasks]
 *     summary: List tasks (optionally filter by project)
 *     security: [ { BearerAuth: [] } ]
 *     parameters:
 *       - in: query
 *         name: project
 *         schema: { type: string }
 *         description: Only tasks in this project
 *     responses:
 *       200: { description: Array of tasks, content: { application/json: { schema: { type: array, items: { $ref: '#/components/schemas/Task' } } } } }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *
 *   post:
 *     tags: [Tasks]
 *     summary: Create a task
 *     security: [ { BearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:       { type: string, example: Buy milk }
 *               description: { type: string, example: 2% fat }
 *               completed:   { type: boolean, example: false }
 *               project:     { type: string, description: "Project ObjectId" }
 *     responses:
 *       201: { description: Task created, content: { application/json: { schema: { $ref: '#/components/schemas/Task' } } } }
 *       400: { $ref: '#/components/responses/ValidationError' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *
 * /api/tasks/{id}:
 *   get:
 *     tags: [Tasks]
 *     summary: Retrieve a task
 *     security: [ { BearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: A task, content: { application/json: { schema: { $ref: '#/components/schemas/Task' } } } }
 *       404: { $ref: '#/components/responses/NotFound' }
 *   put:
 *     tags: [Tasks]
 *     summary: Update a task
 *     security: [ { BearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Task' }
 *     responses:
 *       200: { description: Updated, content: { application/json: { schema: { $ref: '#/components/schemas/Task' } } } }
 *       404: { $ref: '#/components/responses/NotFound' }
 *   delete:
 *     tags: [Tasks]
 *     summary: Delete a task
 *     security: [ { BearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Removed }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
const router = express.Router();

/**
 * @route   GET /api/tasks
 * @desc    List all tasks for the authenticated user.
 *          🔹 Optional query ?project=<projectId> filters by project.
 * @access  Private
 */
router.get('/', protect, getTasks);

/**
 * @route   POST /api/tasks
 * @desc    Create a new task (optionally attach to a project)
 * @access  Private
 */
router.post('/', protect, validate(taskSchema), createTask);

/**
 * @route   GET /api/tasks/:id
 * @desc    Get a task by its ID
 * @access  Private
 */
router.get('/:id', protect, getTaskById);

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update a task (title, description, completed, project, etc.)
 * @access  Private
 */
router.put('/:id', protect, validate(taskSchema), updateTask);

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Remove a task
 * @access  Private
 */
router.delete('/:id', protect, deleteTask);

module.exports = router;