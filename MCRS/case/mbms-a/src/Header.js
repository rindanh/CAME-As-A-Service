import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Header = () => (
  <Navbar bg="dark" expand="md" variant="dark">
    <Navbar.Brand href="/">
      Method Base Management System (MBMS) PT. A
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <Navbar.Text>
          <NavLink to="/" className="px-2 text-decoration-none">
            Profile
          </NavLink>
        </Navbar.Text>
        <Navbar.Text>
          <NavLink to="/browse" className="px-2 text-decoration-none">
            Browse
          </NavLink>
        </Navbar.Text>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
export default Header;
