/**
 * Task controller
 * ---------------
 * Adds optional project filtering & ownership validation.
 */

const asyncHandler = require('../utils/asyncHandler');
const Task = require('../models/Task');
const Project = require('../models/Project');

// 🔹 helper to verify a project belongs to the user
const assertProjectOwnership = async (projectId, userId) => {
    if (!projectId) return;
    const project = await Project.findOne({ _id: projectId, owner: userId });
    if (!project) {
        const err = new Error('Invalid project ID');
        err.statusCode = 400;
        throw err;
    }
};

// @desc    Get tasks (optionally filter by ?project=)
exports.getTasks = asyncHandler(async (req, res) => {
    const query = { owner: req.user.id };
    if (req.query.project) {
        await assertProjectOwnership(req.query.project, req.user.id);
        query.project = req.query.project;
    }
    const tasks = await Task.find(query).sort('-createdAt');
    res.json(tasks);
});

// @desc    Get single task
exports.getTaskById = asyncHandler(async (req, res) => {
    const task = await Task.findOne({
        _id: req.params.id,
        owner: req.user.id,
    });
    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }
    res.json(task);
});

// @desc    Create task
exports.createTask = asyncHandler(async (req, res) => {
    const { title, description, completed, project } = req.body;

    // 🔹 validate project if supplied
    await assertProjectOwnership(project, req.user.id);

    const task = await Task.create({
        title,
        description,
        completed,
        project: project || null,
        owner: req.user.id,
    });
    res.status(201).json(task);
});

// @desc    Update task
exports.updateTask = asyncHandler(async (req, res) => {
    if (req.body.project) {
        await assertProjectOwnership(req.body.project, req.user.id);
    }

    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, owner: req.user.id },
        req.body,
        { new: true, runValidators: true }
    );
    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }
    res.json(task);
});

// @desc    Delete task
exports.deleteTask = asyncHandler(async (req, res) => {
    const deleted = await Task.findOneAndDelete({
        _id: req.params.id,
        owner: req.user.id,
    });
    if (!deleted) {
        res.status(404);
        throw new Error('Task not found');
    }
    res.json({ message: 'Task removed' });
});

// const Task = require('../models/Task');
// const { createTaskSchema, updateTaskSchema } = require('../validators/taskValidator');

// exports.getAll = async (req, res, next) => {
//     try {
//         console.log('Fetching tasks for user:', req.user.id);
//         const tasks = await Task.find({ owner: req.user.id });
//         res.json(tasks);
//     } catch (err) {
//         next(err);
//     }
// };

// exports.getOne = async (req, res, next) => {
//     try {
//         console.log('Fetching task:', req.params.id);
//         const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });
//         if (!task) return res.status(404).json({ message: 'Not found' });
//         res.json(task);
//     } catch (err) {
//         next(err);
//     }
// };

// exports.create = async (req, res, next) => {
//     try {
//         const { error } = createTaskSchema.validate(req.body);
//         if (error) return res.status(400).json({ message: error.details[0].message });

//         console.log('Creating task for user:', req.user.id);
//         const data = { ...req.body, owner: req.user.id };
//         const task = new Task(data);
//         await task.save();

//         console.log('Task created:', task._id);
//         res.status(201).json(task);
//     } catch (err) {
//         next(err);
//     }
// };

// exports.update = async (req, res, next) => {
//     try {
//         // const { error } = updateTaskSchema.validate(req.body);
//         // if (error) return res.status(400).json({ message: error.details[0].message });

//         console.log('Updating task:', req.params.id);
//         const task = await Task.findOneAndUpdate(
//             { _id: req.params.id, owner: req.user.id },
//             req.body,
//             { new: true }
//         );
//         if (!task) return res.status(404).json({ message: 'Not found' });

//         console.log('Task updated:', task._id);
//         res.json(task);
//     } catch (err) {
//         next(err);
//     }
// };

// exports.remove = async (req, res, next) => {
//     try {
//         console.log('Deleting task:', req.params.id);
//         await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
//         res.status(204).end();
//     } catch (err) {
//         next(err);
//     }
// };