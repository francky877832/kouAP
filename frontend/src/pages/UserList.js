import React, { useState } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";

const sampleData = [
  { _id: "1", name: "John Doe", email: "john.doe@email.com", phoneNumber: "1234567890", address: "New York", role: "user", cv: "cv-john.pdf" },
  { _id: "2", name: "Alice Smith", email: "alice.smith@email.com", phoneNumber: "0987654321", address: "Los Angeles", role: "admin", cv: "cv-alice.pdf" },
  { _id: "3", name: "Michael Johnson", email: "michael.johnson@email.com", phoneNumber: "1112223333", address: "Chicago", role: "user", cv: "cv-michael.pdf" },
  { _id: "4", name: "Emma Brown", email: "emma.brown@email.com", phoneNumber: "4445556666", address: "Houston", role: "manager", cv: "cv-emma.pdf" },
];

const UserList = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editRole, setEditRole] = useState("");

  const limit = 3;

  // Paginate data locally
  const indexOfLastUser = currentPage * limit;
  const indexOfFirstUser = indexOfLastUser - limit;
  const users = sampleData.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(sampleData.length / limit);

  const handleShowModal = (user) => {
    setSelectedUser(user);
    setEditRole(user.role);
    setShowModal(true);
  };

  const handleUpdateRole = () => {
    if (!selectedUser) return;

    console.log(`Updating role of ${selectedUser.name} to: ${editRole}`);

    // Simulating database update
    selectedUser.role = editRole;

    // Close modal
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">User List</h2>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleShowModal(user)}>
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* PAGINATION */}
      <div className="d-flex justify-content-between mt-3">
        <Button
          variant="secondary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          ← Previous
        </Button>

        <span>Page {currentPage} / {totalPages}</span>

        <Button
          variant="secondary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next →
        </Button>
      </div>

      {/* MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phoneNumber}</p>
              <p><strong>Address:</strong> {selectedUser.address}</p>

              {selectedUser.cv && (
                <p>
                  <strong>CV:</strong> 
                  <a href={`https://my-server.com/uploads/${selectedUser.cv}`} download>
                    Download CV
                  </a>
                </p>
              )}

              {/* Form to modify the role (only if the user is not a manager) */}
              {selectedUser.role !== "manager" && (
                <Form.Group controlId="roleSelect">
                  <Form.Label><strong>Change Role:</strong></Form.Label>
                  <Form.Select value={editRole} onChange={(e) => setEditRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="jury">Jury</option>
                    <option value="manager">Manager</option>
                    <option value="dev">Dev</option>
                  </Form.Select>
                </Form.Group>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          {selectedUser && selectedUser.role !== "manager" && (
            <Button variant="success" onClick={handleUpdateRole}>
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserList;
