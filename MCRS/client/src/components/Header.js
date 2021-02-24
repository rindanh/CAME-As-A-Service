import React from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../actions";
import "./Header.css";

const Header = props => (
  <Navbar bg="dark" variant="dark" expand="sm" className="header">
    <Navbar.Brand>
      <NavLink to="/">MCRS</NavLink>
    </Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <NavDropdown title="Browse" id="basic-nav-dropdown" className="pr-3">
          <NavLink to="/providers" className="dropdown-item" role="button">
            Providers
          </NavLink>
          <NavLink to="/method-chunks" className="dropdown-item" role="button">
            Method Chunks
          </NavLink>
          <NavLink to="/characteristics" className="dropdown-item" role="button">
            Characteristics
          </NavLink>
          <NavDropdown.Divider />
          <NavLink to="/projects" className="dropdown-item" role="button">
            Projects
          </NavLink>
        </NavDropdown>
        <Navbar.Text>
          <NavLink to="/publish" className="pr-3">
            Publish
          </NavLink>
        </Navbar.Text>
        <Navbar.Text>
          <NavLink to="/find" className="pr-3">
            Find
          </NavLink>
        </Navbar.Text>
        {props.user ? (
          <Navbar.Text>
            <NavLink
              to="/login"
              onClick={() => {
                document.cookie = "token=; Max-Age=-99999999;";
                props.logout();
              }}
            >
              Signed in as: <span className="user">{props.user.name}</span>
            </NavLink>
          </Navbar.Text>
        ) : (
          <Navbar.Text>
            <NavLink to="/login">Sign In</NavLink>
          </Navbar.Text>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = {
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
