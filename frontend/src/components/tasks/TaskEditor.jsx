import React, { useState, useContext, useEffect } from 'react';
import { TaskContext } from '../../context/TaskContext';

const TaskEditor = ({ currentTask, onClose }) => {
    const isEdit = Boolean(currentTask);
    const { createTask, updateTask } = useContext(TaskContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('other');
    const [priority, setPriority] = useState(3);

    useEffect(() => {
        if (isEdit) {
            setTitle(currentTask.title);
            setDescription(currentTask.description || '');
            setDueDate(currentTask.dueDate ? currentTask.dueDate.split('T')[0] : '');
            setCategory(currentTask.category);
            setPriority(currentTask.priority);
        }
    }, [currentTask, isEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { title, description, dueDate, category, priority };
        try {
            if (isEdit) {
                await updateTask(currentTask._id, data);
            } else {
                await createTask(data);
            }
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded">
            <h2 className="text-xl mb-4">{isEdit ? 'Edit Task' : 'New Task'}</h2>
            <div className="mb-2">
                <label className="block">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full border px-2 py-1 rounded"
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block">Description</label>
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full border px-2 py-1 rounded"
                />
            </div>
            <div className="mb-2 grid grid-cols-2 gap-4">
                <div>
                    <label className="block">Due Date</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={e => setDueDate(e.target.value)}
                        className="w-full border px-2 py-1 rounded"
                    />
                </div>
                <div>
                    <label className="block">Category</label>
                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="w-full border px-2 py-1 rounded"
                    >
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="urgent">Urgent</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>
            <div className="mb-2">
                <label className="block">Priority</label>
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={priority}
                    onChange={e => setPriority(Number(e.target.value))}
                    className="w-full border px-2 py-1 rounded"
                />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    {isEdit ? 'Update' : 'Create'}
                </button>
            </div>
        </form>
    );
};

export default TaskEditor;