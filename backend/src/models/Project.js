/**
 * Project model
 * -------------
 * Represents a logical container for tasks.
 * A project belongs to one user (the owner) and can have its own metadata
 * such as a color or description for UI purposes.
 */

const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectSchema = new Schema(
    {
        /** Human-friendly project name (required) */
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        /** Optional description or notes */
        description: {
            type: String,
            trim: true,
            default: '',
            maxlength: 1000,
        },

        /** Optional hex color (e.g., #ff6b6b) to style the project in the UI */
        color: {
            type: String,
            trim: true,
            match: /^#(?:[0-9a-fA-F]{3}){1,2}$/, // 3- or 6-digit hex
            default: '#3B82F6', // Tailwind’s blue-500 as a pleasant default
        },

        /** The user who created/owns the project */
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true, // adds createdAt & updatedAt
    }
);

module.exports = mongoose.model('Project', projectSchema);
