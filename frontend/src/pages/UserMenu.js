import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Flèche gauche de react-icons

import { Button, Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';

const UserMenu = ({ user, isAuthenticated }) => {

    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1); // Navigue vers la page précédente
    };
  
  const { role } = user; // récupère le rôle de l'utilisateur

  return (
    <Navbar bg="light" expand="lg" sticky="top">
        <Button variant="link" onClick={handleGoBack} style={{ padding: 0 }}>
            <FaArrowLeft size={30} />
        </Button>
      <Container>
        <Navbar.Brand href="/">KOUAPP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated ?
            <>
                {/* Routes accessibles à tous les utilisateurs */}
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/all-announcements">Announcements</Nav.Link>

                {/* Routes accessibles uniquement par l'Applicant */}
                {(role === 'user' || role === 'dev') && (
                <NavDropdown title="Applicant" id="applicant-dropdown">
                    <NavDropdown.Item as={Link} to="/user/panel">User Panel</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/user/applications">My Applications</NavDropdown.Item>
                    <Nav.Link as={Link} to="/system/notifications">Notifications</Nav.Link>
                </NavDropdown>
                )}

                {/* Routes protégées pour l'Admin */}
                {(role === 'admin' || role === 'dev') && (
                <NavDropdown title="Admin" id="admin-dropdown">
                    <NavDropdown.Item as={Link} to="/admin/add-announcement">Add Announcement</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/panel">Admin Panel</NavDropdown.Item>
                    <Nav.Link as={Link} to="/system/notifications">Notifications</Nav.Link>
                </NavDropdown>
                )}

                {/* Routes protégées pour le Jury */}
                {(role === 'jury' || role === 'dev') && (
                <NavDropdown title="Jury" id="jury-dropdown">
                    <NavDropdown.Item as={Link} to="/jury/panel">Jury Panel</NavDropdown.Item>
                    <Nav.Link as={Link} to="/system/notifications">Notifications</Nav.Link>
                </NavDropdown>
                )}

                {/* Routes protégées pour le Manager */}
                {(role === 'manager' || role === 'dev') && (
                <NavDropdown title="Manager" id="manager-dropdown">
                    <NavDropdown.Item as={Link} to="/manager/panel">Manager Panel</NavDropdown.Item>
                    <Nav.Link as={Link} to="/system/notifications">Notifications</Nav.Link>
                </NavDropdown>
                )}

                {/* Routes en lecture seule mais modifiables par le Manager */}
                
                <NavDropdown title="Read-Only" id="readonly-dropdown">
                    <NavDropdown.Item as={Link} to="/activities/view">Activities</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/min-activities/view">Min Activities</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/min-points/view">Min Points</NavDropdown.Item>
                </NavDropdown>
                
            </>
        :
        <>
            {/* Routes publiques */}
            <Nav.Item>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/control-user">Control User</Nav.Link>
            </Nav.Item>
        </>
        }
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserMenu;
