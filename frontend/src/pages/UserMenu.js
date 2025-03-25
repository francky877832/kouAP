import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBars, FaTimes } from "react-icons/fa"; // Icônes
import { Button, Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { logout } from "../utils/utilsFunctions";

const UserMenu = ({ user, isAuthenticated }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false); // État pour afficher/masquer le menu

  const handleGoBack = () => {
    navigate(-1);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    logout();
  };

  const { role } = user || {}; // Vérification si `user` est défini

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Button variant="link" onClick={handleGoBack} style={{ padding: 0 }}>
          <FaArrowLeft size={30} />
        </Button>
        <Navbar.Brand href="/">KOUAPP</Navbar.Brand>
        <Button variant="link" onClick={toggleMenu} style={{ padding: 0 }}>
          {showMenu ? <FaTimes size={30} /> : <FaBars size={30} />}
        </Button>

        {showMenu && (
          <Navbar.Collapse className={showMenu ? "show" : ""}>
            <Nav className="me-auto">
              {isAuthenticated ? (
                <>
                  <Nav.Link as={Link} to="/home">Home</Nav.Link>
                  <Nav.Link as={Link} to="/all-announcements">Announcements</Nav.Link>

                  {(role === "user" || role === "dev") && (
                    <NavDropdown title="Applicant" id="applicant-dropdown">
                      <NavDropdown.Item as={Link} to="/user/panel">User Panel</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/user/applications">My Applications</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/system/notifications">Notifications</NavDropdown.Item>
                    </NavDropdown>
                  )}

                  {(role === "admin" || role === "dev") && (
                    <NavDropdown title="Admin" id="admin-dropdown">
                      <NavDropdown.Item as={Link} to="/admin/add-announcement">Add Announcement</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/admin/panel">Admin Panel</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/system/notifications">Notifications</NavDropdown.Item>
                    </NavDropdown>
                  )}

                  {(role === "jury" || role === "dev") && (
                    <NavDropdown title="Jury" id="jury-dropdown">
                      <NavDropdown.Item as={Link} to="/jury/panel">Jury Panel</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/system/notifications">Notifications</NavDropdown.Item>
                    </NavDropdown>
                  )}

                  {(role === "manager" || role === "dev") && (
                    <NavDropdown title="Manager" id="manager-dropdown">
                      <NavDropdown.Item as={Link} to="/manager/panel">Manager Panel</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/system/notifications">Notifications</NavDropdown.Item>
                    </NavDropdown>
                  )}

                  <NavDropdown title="Read-Only" id="readonly-dropdown">
                    <NavDropdown.Item as={Link} to="/activities/view">Activities</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/min-activities/view">Min Activities</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/min-points/view">Min Points</NavDropdown.Item>
                  </NavDropdown>

                  {/* Bouton Logout */}
                  <Nav.Item>
                    <Button variant="danger" onClick={handleLogout} className="ms-3">
                      Logout
                    </Button>
                  </Nav.Item>
                </>
              ) : (
                <>
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
              )}
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default UserMenu;
