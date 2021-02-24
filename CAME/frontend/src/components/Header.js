import React from 'react';
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";

import { userActions } from '../_actions'

class Header extends React.Component {

	render() {
		return (
			<Navbar bg="dark" variant="dark" expand="sm" className="header">
				<Container>
					<Navbar.Brand href="/">CAME</Navbar.Brand>
					<Navbar.Collapse id="basic-navbar-nav">
			            <Nav className="ml-auto">
							{this.props.authentication.loggedIn ? (
				                <Navbar.Text>
					                <NavLink to="/login">
					                    Hi, <span className="user">{this.props.authentication.user.username}</span>
					                </NavLink>
				                </Navbar.Text>
							) : (
				                <Navbar.Text>
				                	<NavLink to='/login'>Sign In</NavLink>
				                </Navbar.Text>
							)}
			            </Nav>
			        </Navbar.Collapse>
			    </Container>
			</Navbar>

		)
	}

}

const mapStateToProps = state => { 
    console.log(state)
    return ({
        authentication: state.authentication
    })
};

const mapDispatchToProps = {
  login: userActions.login,
  logout: userActions.logout
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);