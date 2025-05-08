/**
 * Task model
 * ----------
 * Represents a single task that belongs to a user and, optionally, to a
 * project.  Each task can be marked as completed and time-stamped.
 */

const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
            default: '',
        },

        completed: {
            type: Boolean,
            default: false,
        },

        /** The user who created the task (required) */
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        /**
         * The project this task belongs to.
         * Optional until we build the Project model & routes.
         */
        project: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            default: null,
        },
    },
    {
        timestamps: true, // automatically adds createdAt & updatedAt
    }
);

module.exports = mongoose.model('Task', taskSchema);