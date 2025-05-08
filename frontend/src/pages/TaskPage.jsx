// src/components/Tasks/TaskPage.js
import React, { useState } from 'react';
import Split from 'react-split'


import TaskList from '../components/tasks/TaskList';
import TaskEditor from '../components/tasks/TaskEditor';
import PrivateRoute from '../components/auth/PrivateRoute';
import SideBar from '../components/layout/SideBar';

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
        //         <PrivateRoute>
        //           <Split
        //             className='layout-split'
        //             sizes={[25, 75]}       // initial percent widths of each pane
        //             minSize={100}          // minimum px width for each pane
        //             gutterSize={10}         // thickness of the draggable divider
        //             gutterAlign="center"   // position of the gutter
        //             style={{
        //               height: '100vh',
        //             }}
        //           >
        //             <AsideBar />
        //             <TaskPage />
        //           </Split>
        //         </PrivateRoute>
        <PrivateRoute>
            <Split
                className='layout-split'
                sizes={[40, 60]}       // initial percent widths of each pane
                minSize={100}
                // maxSize={500}          // minimum px width for each pane
                gutterSize={5}         // thickness of the draggable divider
                gutterAlign="center"   // position of the gutter
                style={{
                    height: '100vh',
                }}
            >
                < SideBar />
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
            </Split>
        </PrivateRoute >


    );
};

export default TaskPage;