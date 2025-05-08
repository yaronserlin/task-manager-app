import React, { useContext, useState } from 'react';
import {
    Button,
    InputGroup,
    FormControl,
    Nav,
    Image,
    Collapse,
} from 'react-bootstrap';
import { Plus, Search, List, QuestionCircle } from 'react-bootstrap-icons';
import { AuthContext } from '../../context/AuthContext';

export default function Sidebar() {
    const [projectsOpen, setProjectsOpen] = useState(true);
    const { user, logout } = useContext(AuthContext);
    const [activeKey, setActiveKey] = useState('Today');

    const myProjects = [
        { name: 'Home', emoji: '🏠' },
        { name: 'Education', emoji: '📚' },
    ];

    return (
        <>
            {/* Inline styling for hover, active, and default link color */}
            <style type="text/css">
                {`
        .sidebar-nav .nav-link { color: #555 !important; }
        .sidebar-nav .nav-link:hover { background-color: #f5f5f5 !important; }
        .sidebar-nav .nav-link.active { background-color: #fde2e2 !important; }
        `}
            </style>

            <aside className="d-flex flex-column vh-100 p-3 border-end">
                {/* User Header */}
                <div className="d-flex align-items-center mb-4">
                    <Image
                        src="https://via.placeholder.com/32"
                        roundedCircle
                        className="me-2"
                    />
                    <span className="fs-4">{user?.name}</span>
                </div>

                {/* Add Task */}
                <Button
                    variant="link"
                    className="d-flex align-items-center mb-3 text-danger fw-bold p-0"
                >
                    <Plus className="me-2" /> Add task
                </Button>

                {/* Search Input */}
                <InputGroup className="mb-3">
                    <InputGroup.Text>
                        <Search />
                    </InputGroup.Text>
                    <FormControl placeholder="Search" />
                </InputGroup>

                {/* Main Nav */}
                <Nav
                    variant="pills"
                    activeKey={activeKey}
                    onSelect={setActiveKey}
                    className="flex-column sidebar-nav"
                >
                    <Nav.Item>
                        <Nav.Link eventKey="Inbox">
                            Inbox
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="Today">
                            Today
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="Upcoming">Upcoming</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="Filters">Filters & Labels</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="Completed">Completed</Nav.Link>
                    </Nav.Item>
                </Nav>

                {/* Projects Section */}
                <div
                    className="d-flex justify-content-between align-items-center mt-4 mb-2 text-uppercase text-secondary"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setProjectsOpen(!projectsOpen)}
                >
                    My Projects
                    <List />
                </div>

                <Collapse in={projectsOpen}>
                    <Nav
                        variant="pills"
                        activeKey={activeKey}
                        onSelect={setActiveKey}
                        className="flex-column sidebar-nav"
                    >
                        {myProjects.map((proj) => (
                            <Nav.Item key={proj.name}>
                                <Nav.Link eventKey={proj.name}>
                                    {proj.emoji} {proj.name}
                                </Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                </Collapse>

                {/* Footer */}
                <div className="mt-auto d-flex justify-content-between align-items-center">
                    <Button variant="link" className="d-flex align-items-center p-0">
                        <Plus className="me-1" /> Add a team
                    </Button>
                    <Button variant="link" className="p-0">
                        <QuestionCircle />
                    </Button>
                </div>
            </aside>
        </>
    );
}

// import React, { useContext, useState } from 'react';
// import {
//     Button,
//     InputGroup,
//     FormControl,
//     Nav,
//     Image,
//     Collapse,
// } from 'react-bootstrap';
// import { Plus, Search, List, QuestionCircle } from 'react-bootstrap-icons';
// import { AuthContext } from '../../context/AuthContext';

// export default function Sidebar() {
//     const [projectsOpen, setProjectsOpen] = useState(true);
//     const { user, logout } = useContext(AuthContext);
//     const [activeKey, setActiveKey] = useState('Today');

//     const myProjects = [
//         { name: 'Home', emoji: '🏠' },
//         { name: 'Education', emoji: '📚' },
//     ];

//     return (
//         <>
//             {/* Inline styling for hover and active */}
//             <style type="text/css">
//                 {`
//         .sidebar-nav .nav-link:hover { background-color: #f5f5f5 !important; }
//         .sidebar-nav .nav-link.active { background-color: #fde2e2 !important; }
//         `}
//             </style>

//             <aside className="d-flex flex-column vh-100 p-3 border-end">
//                 {/* User Header */}
//                 <div className="d-flex align-items-center mb-4">
//                     <Image
//                         src="https://via.placeholder.com/32"
//                         roundedCircle
//                         className="me-2"
//                     />
//                     <span className="fs-4">{user?.name}</span>
//                 </div>

//                 {/* Add Task */}
//                 <Button
//                     variant="link"
//                     className="d-flex align-items-center mb-3 text-danger fw-bold p-0"
//                 >
//                     <Plus className="me-2" /> Add task
//                 </Button>

//                 {/* Search Input */}
//                 <InputGroup className="mb-3">
//                     <InputGroup.Text>
//                         <Search />
//                     </InputGroup.Text>
//                     <FormControl placeholder="Search" />
//                 </InputGroup>

//                 {/* Main Nav */}
//                 <Nav
//                     variant="pills"
//                     activeKey={activeKey}
//                     onSelect={setActiveKey}
//                     className="flex-column sidebar-nav"
//                 >
//                     <Nav.Item>
//                         <Nav.Link eventKey="Inbox">
//                             Inbox
//                         </Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                         <Nav.Link eventKey="Today">
//                             Today
//                         </Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                         <Nav.Link eventKey="Upcoming">Upcoming</Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                         <Nav.Link eventKey="Filters">Filters & Labels</Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                         <Nav.Link eventKey="Completed">Completed</Nav.Link>
//                     </Nav.Item>
//                 </Nav>

//                 {/* Projects Section */}
//                 <div
//                     className="d-flex justify-content-between align-items-center mt-4 mb-2 text-uppercase text-secondary"
//                     style={{ cursor: 'pointer' }}
//                     onClick={() => setProjectsOpen(!projectsOpen)}
//                 >
//                     My Projects
//                     <List />
//                 </div>

//                 <Collapse in={projectsOpen}>
//                     <Nav
//                         variant="pills"
//                         activeKey={activeKey}
//                         onSelect={setActiveKey}
//                         className="flex-column sidebar-nav"
//                     >
//                         {myProjects.map((proj) => (
//                             <Nav.Item key={proj.name}>
//                                 <Nav.Link eventKey={proj.name}>
//                                     {proj.emoji} {proj.name}
//                                 </Nav.Link>
//                             </Nav.Item>
//                         ))}
//                     </Nav>
//                 </Collapse>

//                 {/* Footer */}
//                 <div className="mt-auto d-flex justify-content-between align-items-center">
//                     <Button variant="link" className="d-flex align-items-center p-0">
//                         <Plus className="me-1" /> Add a team
//                     </Button>
//                     <Button variant="link" className="p-0">
//                         <QuestionCircle />
//                     </Button>
//                 </div>
//             </aside>
//         </>
//     );
// }

// import React, { useContext, useState } from 'react';
// import { Button, InputGroup, FormControl, Nav, Badge, Image } from 'react-bootstrap';
// import { Plus, Search, List, QuestionCircle } from 'react-bootstrap-icons';
// import './Sidebar.css';

// import { AuthContext } from '../../context/AuthContext';

// function Sidebar() {
//     const [projectsOpen, setProjectsOpen] = useState(true);
//     const { user, logout } = useContext(AuthContext);
//     const [activeKey, setActiveKey] = useState('Today');

//     const myProjects = [
//         { name: 'Home', emoji: '🏠', count: 5 },
//         { name: 'Education', emoji: '📚', count: 4 },
//     ];

//     return (
//         <div className="sidebar">
//             {/* User Header */}
//             <div className="user-header">
//                 <Image src="https://via.placeholder.com/32" roundedCircle />
//                 <span className="user-name fs-3">{user && user.name}</span>
//             </div>

//             {/* Add Task */}
//             <Button className="add-task-btn d-flex align-items-center mb-3">
//                 <Plus className="me-2" /> Add task
//             </Button>

//             {/* Search Input */}
//             <InputGroup className="search-group">
//                 <InputGroup.Text><Search /></InputGroup.Text>
//                 <FormControl placeholder="Search" />
//             </InputGroup>

//             {/* Menu */}
//             <Nav activeKey={activeKey} onSelect={setActiveKey} className="main-nav flex-column mt-4">
//                 <Nav.Link eventKey="Inbox" className="d-flex justify-content-between align-items-center">
//                     Inbox <Badge bg="secondary">2</Badge>
//                 </Nav.Link>
//                 <Nav.Link eventKey="Today">
//                     Today <Badge bg="danger">6</Badge>
//                 </Nav.Link>
//                 <Nav.Link eventKey="Upcoming">Upcoming</Nav.Link>
//                 <Nav.Link eventKey="Filters">Filters & Labels</Nav.Link>
//                 <Nav.Link eventKey="Completed">Completed</Nav.Link>
//             </Nav>

//             {/* Projects Section */}
//             <div className="projects-header d-flex justify-content-between align-items-center"
//                 onClick={() => setProjectsOpen(!projectsOpen)}
//             >
//                 <span className='text-uppercase'>My Projects</span>
//                 <List />
//             </div>

//             {projectsOpen && (
//                 <Nav activeKey={activeKey} onSelect={setActiveKey} className="projects-list flex-column">
//                     {myProjects.map((proj) => (
//                         <Nav.Link
//                             key={proj.name}
//                             eventKey={proj.name}
//                             className="project-item d-flex justify-content-between align-items-center"
//                         >
//                             <span>{proj.emoji} {proj.name}</span>
//                             <Badge bg="secondary">{proj.count}</Badge>
//                         </Nav.Link>
//                     ))}
//                 </Nav>
//             )}

//             {/* Footer */}
//             <div className="sidebar-footer d-flex justify-content-between align-items-center mt-auto">
//                 <Button variant="link" className="footer-btn d-flex align-items-center">
//                     <Plus /><span className="ms-1">Add a team</span>
//                 </Button>
//                 <Button variant="link" className="footer-btn">
//                     <QuestionCircle />
//                 </Button>
//             </div>
//         </div>
//     );
// }

// export default Sidebar;


// // // import React, { useContext } from 'react';
// // // import { AuthContext } from '../../context/AuthContext';

// // // import ListGroup from 'react-bootstrap/ListGroup';
// // // import Nav from 'react-bootstrap/Nav';
// // // import NavItem from 'react-bootstrap/esm/NavItem';
// // // import { useNavigate } from 'react-router-dom';
// // // import Button from 'react-bootstrap/esm/Button';

// // // const SideBar = () => {
// // //     const { user, logout } = useContext(AuthContext);
// // //     const navigate = useNavigate();
// // //     return (
// // //         <>

// // //             {/* <ListGroup className="flex-column bg-body-secondary">
// // //                 <ListGroup.Item className='btn-outline-secondary' action><h2>{user && (user.name)}</h2></ListGroup.Item>
// // //                 <ListGroup.Item action onClick={() => navigate("#inbox")}>Inbox</ListGroup.Item>
// // //                 <ListGroup.Item action onClick={() => navigate("#Today")}>Today</ListGroup.Item>
// // //                 <ListGroup.Item action onClick={() => logout()}>Logout</ListGroup.Item>;

// // //             </ListGroup> */}
// // //             <Nav className="flex-column bg-body-secondary">
// // //                 <Nav.Item><h2>{user && (user.name)}</h2></Nav.Item>
// // //                 <Nav.Link href="#inbox">Inbox</Nav.Link>
// // //                 <Nav.Link href="#today">Today</Nav.Link>
// // //                 <Nav.Link href="#projects">My Projects</Nav.Link>
// // //                 <Nav.Link href="#projects/1"># Project 1</Nav.Link>
// // //                 <Nav.Link href="#projects/2"># Project 2</Nav.Link>
// // //                 <NavItem as={'button'} className='btn btn-outline-secondary' onClick={() => logout()}>Logout</NavItem>
// // //                 <NavItem as={'button'} className='btn ' onClick={() => logout()}>Logout</NavItem>
// // //             </Nav>

// // //         </>
// // //     );
// // // };

// // // export default SideBar;