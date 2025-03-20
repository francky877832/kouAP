import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import NotificationIcon from '../components/NotificationIcon';
import { UserContext } from '../context/UserContext';
import Loading from '../components/Loading';

const UserPanel = () => {
  
    const { updateUser } = useContext(UserContext)
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    surname: '',
    tcID: '',
    birthDate: '',
    username: '',
    email: '',
    phoneNumber: '',
    address: '',
    cv: '',
    password: '', // New field for password
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setUpdatedUser({ ...updatedUser, cv: fileUrl });
    }
  };

  useEffect(() => {
    setUpdatedUser({
      name: 'John',
      surname: 'Doe',
      tcID: '1234567890',
      birthDate: '1990-01-01',
      username: 'johndoe',
      email: 'johndoe@example.com',
      phoneNumber: '+1234567890',
      address: '123 Main Street',
      cv: 'http://example.com/cv.pdf', // URL fictive pour le CV
      password: '', // Initialize password field
    });
  }, []);

  const handleUpdate = async () => {
    setIsLoading(true)
    const formData = new FormData();
  
    // Append user data to FormData
    formData.append('name', updatedUser.name);
    formData.append('surname', updatedUser.surname);
    formData.append('tcID', updatedUser.tcID);
    formData.append('birthDate', updatedUser.birthDate);
    formData.append('username', updatedUser.username);
    formData.append('email', updatedUser.email);
    formData.append('phoneNumber', updatedUser.phoneNumber);
    formData.append('address', updatedUser.address);
    formData.append('password', updatedUser.password);
  
    if (updatedUser.cv) {
      formData.append('cv', updatedUser.cv);
    }

    const res = await updateUser(formData)
    if(res)
    {
        alert('Profile updated');
    }
    else
    {
        alert('Error while updating the profile');
    }
    
  
    setIsLoading(false)
    setIsEditing(false);
  };
  

  const handleViewApplications = () => {
    // Navigate to the applications page
    window.location.href = '/user/applications';
  };

  if(isLoading)
  {
    <Loading/>
  }

  return (
    <div className="container my-5">
      <div style={{ position: 'absolute', top: '20px', left: '10px' }}>
        <NotificationIcon />
      </div>
      <Card className="p-4">
        <Button
          variant="info"
          onClick={handleViewApplications}
          className="mb-4"
          style={{ position: 'absolute', top: '20px', right: '20px' }} // Positioned top right for visibility
        >
          View Applications
        </Button>
        <h2>User Panel</h2>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={updatedUser.name}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Form.Group>

          <Form.Group controlId="surname">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              name="surname"
              value={updatedUser.surname}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Form.Group>

          <Form.Group controlId="tcID">
            <Form.Label>ID Number (TCID)</Form.Label>
            <Form.Control
              type="text"
              name="tcID"
              value={updatedUser.tcID}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Form.Group>

          <Form.Group controlId="birthDate">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control
              type="date"
              name="birthDate"
              value={updatedUser.birthDate}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Form.Group>

          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={updatedUser.username}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Form.Group>

          {/* New password field */}
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={updatedUser.password}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Form.Group>

          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={updatedUser.phoneNumber}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={updatedUser.address}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Form.Group>

          <Form.Group controlId="cv">
            <Form.Label>CV</Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
              disabled={!isEditing}
            />
            {updatedUser.cv && (
              <div>
                <a href={updatedUser.cv} target="_blank" rel="noopener noreferrer">
                  Download CV
                </a>
              </div>
            )}
          </Form.Group>

          <Button
            variant={isEditing ? 'secondary' : 'primary'}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>

          {isEditing && (
            <Button
              variant="success"
              onClick={handleUpdate}
              className="ms-3"
            >
              Update
            </Button>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default UserPanel;
