import React from "react";
import { connect } from "react-redux";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { authenticate } from "../actions/";
import Title from "./Title";
import axios from "axios";
import { NavLink } from "react-router-dom";

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  render() {
    // console.log("props", this.props);
    // console.log("state", this.state);
    return (
      <Container
        fluid
        className="pt-3 pb-5 d-flex flex-column align-items-center justify-content-center"
      >
        <Title className="pt-5">Login</Title>
        <Row>
          <Col style={{ width: "40vw" }}>
            <Form>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email..."
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password..."
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
            <br />
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  axios
                    .post("/authenticate", this.state)
                    .then(res => {
                      console.log("res", res);
                      console.log(`Item - logged successfully`);
                      var expires = "";
                      var date = new Date();
                      date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
                      expires = "; expires=" + date.toUTCString();
                      document.cookie = "token=" + (res.data.token || "") + expires + "; path=/";
                      this.props.authenticate({
                        token: res.data,
                        user: this.props.providers[
                          this.props.providers.all.find(
                            e => this.props.providers[e].email === this.state.email
                          )
                        ]
                      });
                      alert(res.status + " " + res.statusText);
                      this.props.history.push("/");
                    })
                    .catch(e => {
                      alert("Failed");
                      console.log("Login failed , Error ", e);
                    });
                }}
              >
                <Form.Group className="text-right">
                  <NavLink to="/register" className="mr-3">
                    Don't have an account?
                  </NavLink>
                  <Button variant="success" type="submit">
                    &nbsp;&nbsp;Login&nbsp;&nbsp;
                  </Button>
                </Form.Group>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = {
  authenticate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
