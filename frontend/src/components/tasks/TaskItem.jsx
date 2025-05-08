import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';

const TaskItem = ({ task, onEdit }) => {
    const { updateTask, deleteTask } = useContext(TaskContext);

    const handleToggle = () => {
        updateTask(task._id, { isComplete: !task.isComplete });
    };

    const handleDelete = () => {
        deleteTask(task._id);
    };

    return (
        <div className="flex items-center justify-between border p-2 mb-2 rounded">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={task.isComplete}
                    onChange={handleToggle}
                    className="mr-2"
                />
                <div>
                    <div className={task.isComplete ? 'line-through' : ''}>{task.title}</div>
                    {task.dueDate && (
                        <div className="text-sm text-gray-500">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => onEdit(task)}
                    className="text-blue-500 hover:text-blue-700"
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="text-red-500 hover:text-red-700"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;