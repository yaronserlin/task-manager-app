// src/components/Tasks/TaskPage.js
import React, { useState } from 'react';
import TaskList from '../components/tasks/taskList/TaskList';
import TaskEditor from '../components/tasks/taskEditor/TaskEditor';

const TaskPage = () => {
    const [editorOpen, setEditorOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const openEditor = (task = null) => {
        setSelectedTask(task);
        setEditorOpen(true);
    };

    const closeEditor = () => {
        setSelectedTask(null);
        setEditorOpen(false);
    };

    return (
        <div className="p-4">
            <button
                onClick={() => openEditor()}
                className="mb-4 bg-green-500 text-white py-2 px-4 rounded"
            >
                New Task
            </button>

            <TaskList onEdit={openEditor} />

            {editorOpen && (
                <TaskEditor
                    currentTask={selectedTask}
                    onClose={closeEditor}
                />
            )}
        </div>
    );
};

export default TaskPage;