/**
 * Project routes
 * --------------
 * Handles CRUD operations for projects.
 */

const express = require('express');
const {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
} = require('../controllers/projectController');
const protect = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { projectSchema } = require('../validators/projectValidator');


/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: CRUD for projects
 */

/**
 * @swagger
 * /api/projects:
 *   get:
 *     tags: [Projects]
 *     summary: List projects for the authenticated user
 *     security: [ { BearerAuth: [] } ]
 *     responses:
 *       200: { description: Array of projects, content: { application/json: { schema: { type: array, items: { $ref: '#/components/schemas/Project' } } } } }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *
 *   post:
 *     tags: [Projects]
 *     summary: Create a project
 *     security: [ { BearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:        { type: string, example: Personal }
 *               description: { type: string, example: Daily chores }
 *               color:       { type: string, example: '#FF6B6B' }
 *     responses:
 *       201: { description: Project created, content: { application/json: { schema: { $ref: '#/components/schemas/Project' } } } }
 *       400: { $ref: '#/components/responses/ValidationError' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *
 * /api/projects/{id}:
 *   get:
 *     tags: [Projects]
 *     summary: Retrieve a single project
 *     security: [ { BearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: A project, content: { application/json: { schema: { $ref: '#/components/schemas/Project' } } } }
 *       404: { $ref: '#/components/responses/NotFound' }
 *   put:
 *     tags: [Projects]
 *     summary: Update a project
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
 *           schema: { $ref: '#/components/schemas/Project' }
 *     responses:
 *       200: { description: Updated, content: { application/json: { schema: { $ref: '#/components/schemas/Project' } } } }
 *       404: { $ref: '#/components/responses/NotFound' }
 *   delete:
 *     tags: [Projects]
 *     summary: Delete a project
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
 * @route   GET /api/projects
 * @desc    List all projects owned by the authenticated user
 * @access  Private
 */
router.get('/', protect, getProjects);

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Private
 */
router.post('/', protect, validate(projectSchema), createProject);

/**
 * @route   GET /api/projects/:id
 * @desc    Get a single project by its ID
 * @access  Private
 */
router.get('/:id', protect, getProjectById);

/**
 * @route   PUT /api/projects/:id
 * @desc    Update an existing project
 * @access  Private
 */
router.put('/:id', protect, validate(projectSchema), updateProject);

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete a project (optionally cascade-delete or orphan its tasks)
 * @access  Private
 */
router.delete('/:id', protect, deleteProject);

module.exports = router;
