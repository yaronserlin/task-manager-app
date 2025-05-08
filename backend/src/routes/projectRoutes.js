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
const  protect  = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { projectSchema } = require('../validators/projectValidator');

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
