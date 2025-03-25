import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap'; // Using Bootstrap for the design
import NotificationIcon from '../components/NotificationIcon';
import { UserContext } from '../context/UserContext';
import UserMenu from './UserMenu';

const ManagerPanel = () => {
    const { user, isAuthenticated } = useContext(UserContext);
  
  return (
    <Container>
      {/* Notification Icon added at the top-left */}
      <div style={{ position: 'absolute', top: '20px', left: '10px' }}>
        <NotificationIcon />
      </div>

      <UserMenu user={user} isAuthenticated={isAuthenticated} />


      <h2 className="text-center my-4">Welcome to the Manager Panel</h2>

      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Edit Criteria</Card.Title>
              <Card.Text>
                Modify the criteria for managing activities.
              </Card.Text>
              <Link to="/manager/edit-criteria">
                <Button variant="primary">Access</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Activities</Card.Title>
              <Card.Text>
                View and manage activities.
              </Card.Text>
              <Link to="/activities/view">
                <Button variant="primary">Access</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Mini Activities</Card.Title>
              <Card.Text>
                Manage small activities.
              </Card.Text>
              <Link to="/min-activities/view">
                <Button variant="primary">Access</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Mini Points</Card.Title>
              <Card.Text>
                Manage the points assigned to mini activities.
              </Card.Text>
              <Link to="/min-points/view">
                <Button variant="primary">Access</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Case Coefficients</Card.Title>
              <Card.Text>
                View and adjust the coefficients for cases.
              </Card.Text>
              <Link to="/case-coef/view">
                <Button variant="primary">Access</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Manager Form</Card.Title>
              <Card.Text>
                Modify or add a management form.
              </Card.Text>
              <Link to="/manager-form/edit-form">
                <Button variant="primary">Access</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ManagerPanel;
