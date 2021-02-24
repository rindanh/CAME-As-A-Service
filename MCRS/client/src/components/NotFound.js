import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <Container fluid className="not-found d-flex align-items-center justify-content-center">
      <Row>
        <Col className="text-center">
          <h1 className="title mb-0">404</h1>
          <p>Error! Not found</p>
          <NavLink exact to="/">
            <Button className="mt-3">Go to Homepage</Button>
          </NavLink>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
