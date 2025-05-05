import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavbarComponent = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (

        <Navbar bg="dark" data-bs-theme="dark" expand="sm">
            <Container>
                <Navbar.Brand role="button" onClick={() => navigate('/')}>Task Manager {user && "- " + user.name}</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse >
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate('/tasks')}>Tasks</Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        {user ? (
                            <>
                                {/* <Nav.Link onClick={() => navigate('/profile')} > {user.name}</Nav.Link> */}
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>

                                <Nav.Link onClick={() => navigate('/register')}>Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
};

export default NavbarComponent;