const Task = require('../models/Task');
const { createTaskSchema, updateTaskSchema } = require('../validators/taskValidator');

exports.getAll = async (req, res, next) => {
    try {
        console.log('Fetching tasks for user:', req.user.id);
        const tasks = await Task.find({ owner: req.user.id });
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

exports.getOne = async (req, res, next) => {
    try {
        console.log('Fetching task:', req.params.id);
        const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });
        if (!task) return res.status(404).json({ message: 'Not found' });
        res.json(task);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { error } = createTaskSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        console.log('Creating task for user:', req.user.id);
        const data = { ...req.body, owner: req.user.id };
        const task = new Task(data);
        await task.save();

        console.log('Task created:', task._id);
        res.status(201).json(task);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        // const { error } = updateTaskSchema.validate(req.body);
        // if (error) return res.status(400).json({ message: error.details[0].message });

        console.log('Updating task:', req.params.id);
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, owner: req.user.id },
            req.body,
            { new: true }
        );
        if (!task) return res.status(404).json({ message: 'Not found' });

        console.log('Task updated:', task._id);
        res.json(task);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        console.log('Deleting task:', req.params.id);
        await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};