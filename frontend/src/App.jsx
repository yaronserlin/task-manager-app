import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavbarComponent from './components/layout/Navbar';
// import LoginForm from './components/auth/loginForm/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import TaskPage from './pages/TaskPage';
import { AuthContext } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import Row from 'react-bootstrap/esm/Row';
import SideBar from './components/layout/SideBar';
import Col from 'react-bootstrap/esm/Col';

import Split from 'react-split'

import './app.css';

function App() {
  const { token } = useContext(AuthContext);

  // PrivateRoute component to guard protected routes
  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <h1>Task Manager App</h1>
      <a href="/login">login</a>
    </>
    // <Router>
    //   {/* <NavbarComponent /> */}

    //   <Routes>
    //     <Route path="/" element={<><h1>Home</h1></>} />
    //     <Route path="/login" element={<LoginPage />} />
    //     <Route path="/register" element={<RegisterForm />} />
    //     <Route
    //       path="/tasks"
    //       element={

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
    //       }
    //     />
    //   </Routes>

    // </Router >
  );
}

export default App;