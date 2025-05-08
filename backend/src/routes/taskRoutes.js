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


// const router = require('express').Router();
// const ctl = require('../controllers/taskController');

// /**
//  * @swagger
//  * tags:
//  *   name: Tasks
//  *   description: Task management routes
//  */

// /**
//  * @swagger
//  * /api/tasks:
//  *   get:
//  *     summary: Get all tasks for authenticated user
//  *     tags: [Tasks]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: List of tasks
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Task'
//  */
// router.get('/', ctl.getAll);

// /**
//  * @swagger
//  * /api/tasks/{id}:
//  *   get:
//  *     summary: Get a single task by ID
//  *     tags: [Tasks]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Task ID
//  *     responses:
//  *       200:
//  *         description: Task object
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Task'
//  *       404:
//  *         description: Task not found
//  */
// router.get('/:id', ctl.getOne);

// /**
//  * @swagger
//  * /api/tasks:
//  *   post:
//  *     summary: Create a new task
//  *     tags: [Tasks]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/TaskCreate'
//  *     responses:
//  *       201:
//  *         description: Task created
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Task'
//  *       400:
//  *         description: Invalid input
//  */
// router.post('/', ctl.create);

// /**
//  * @swagger
//  * /api/tasks/{id}:
//  *   put:
//  *     summary: Update an existing task
//  *     tags: [Tasks]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Task ID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/TaskUpdate'
//  *     responses:
//  *       200:
//  *         description: Task updated
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Task'
//  *       400:
//  *         description: Invalid input
//  *       404:
//  *         description: Task not found
//  */
// router.put('/:id', ctl.update);

// /**
//  * @swagger
//  * /api/tasks/{id}:
//  *   delete:
//  *     summary: Delete a task
//  *     tags: [Tasks]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Task ID
//  *     responses:
//  *       204:
//  *         description: Task deleted
//  *       404:
//  *         description: Task not found
//  */
// router.delete('/:id', ctl.remove);

// module.exports = router;