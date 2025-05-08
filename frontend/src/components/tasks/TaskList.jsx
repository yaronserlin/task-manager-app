import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList = ({ onEdit }) => {
    const { tasks } = useContext(TaskContext);

    if (!tasks.length) return <div className="p-4">No tasks yet.</div>;

    return (
        <div className="p-4">
            {tasks.map(task => (
                <TaskItem key={task._id} task={task} onEdit={onEdit} />
            ))}
        </div>
    );
};

export default TaskList;