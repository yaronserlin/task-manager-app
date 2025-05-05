import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavbarComponent from './components/layout/navbar/Navbar';
// import LoginForm from './components/auth/loginForm/LoginForm';
import RegisterForm from './components/auth/registerForm/RegisterForm';
import TaskPage from './pages/TaskPage';
import { AuthContext } from './context/AuthContext';
import LoginPage from './pages/LoginPage';

function App() {
  const { token } = useContext(AuthContext);

  // PrivateRoute component to guard protected routes
  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <NavbarComponent />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/" element={<><h1>Home</h1></>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <TaskPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;