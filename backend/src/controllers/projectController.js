/**
 * Project controller
 * ------------------
 * CRUD for projects; all actions are scoped to req.user.id.
 */

const asyncHandler = require('../utils/asyncHandler');
const Project = require('../models/Project');

// @desc    Get all projects for logged-in user
// @route   GET /api/projects
// @access  Private
exports.getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find({ owner: req.user.id }).sort('createdAt');
    res.json(projects);
});

// @desc    Get single project
exports.getProjectById = asyncHandler(async (req, res) => {
    const project = await Project.findOne({
        _id: req.params.id,
        owner: req.user.id,
    });
    if (!project) {
        res.status(404);
        throw new Error('Project not found');
    }
    res.json(project);
});

// @desc    Create project
exports.createProject = asyncHandler(async (req, res) => {
    const { name, description, color } = req.body;
    const project = await Project.create({
        name,
        description,
        color,
        owner: req.user.id,
    });
    res.status(201).json(project);
});

// @desc    Update project
exports.updateProject = asyncHandler(async (req, res) => {
    const project = await Project.findOneAndUpdate(
        { _id: req.params.id, owner: req.user.id },
        req.body,
        { new: true, runValidators: true }
    );
    if (!project) {
        res.status(404);
        throw new Error('Project not found');
    }
    res.json(project);
});

// @desc    Delete project
exports.deleteProject = asyncHandler(async (req, res) => {
    const deleted = await Project.findOneAndDelete({
        _id: req.params.id,
        owner: req.user.id,
    });
    if (!deleted) {
        res.status(404);
        throw new Error('Project not found');
    }
    res.json({ message: 'Project removed' });
});
