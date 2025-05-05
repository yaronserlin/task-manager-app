const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    owner: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    isComplete: { type: Boolean, default: false },
    dueDate: { type: Date },
    category: { type: String, enum: ['work', 'personal', 'urgent', 'other'], default: 'other' },
    priority: { type: Number, min: 1, max: 5, default: 3 },
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);