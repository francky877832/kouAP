import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";

const EmptyPage = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col className="text-center">
          <Alert variant="warning">
            <h4>No Data Available</h4>
            <p>There is no content to display at the moment.</p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default EmptyPage;