import './index.css';

import React, { StrictMode } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import App from './App.jsx';

import { AuthProvider } from './context/AuthContext.jsx';
import { TaskProvider } from './context/TaskContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterForm from './components/auth/RegisterForm.jsx';
import TaskPage from './pages/TaskPage.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/tasks" element={<TaskPage />} />
          </Routes>
        </Router>
        {/* <RouterProvider router={router} /> */}
      </TaskProvider>
    </AuthProvider>
  </StrictMode>
);
