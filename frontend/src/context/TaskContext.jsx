import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const { token } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        if (!token) return;
        const res = await api.get('/tasks');
        setTasks(res.data);
    };

    const createTask = async (data) => {
        const res = await api.post('/tasks', data);
        setTasks(prev => [...prev, res.data]);
        return res.data;
    };

    const updateTask = async (id, data) => {
        const res = await api.put(`/tasks/${id}`, data);
        setTasks(prev => prev.map(t => t._id === id ? res.data : t));
        return res.data;
    };

    const deleteTask = async (id) => {
        await api.delete(`/tasks/${id}`);
        setTasks(prev => prev.filter(t => t._id !== id));
    };

    useEffect(() => {
        fetchTasks();
    }, [token]);

    return (
        <TaskContext.Provider value={{ tasks, fetchTasks, createTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};