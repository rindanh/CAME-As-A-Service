import React from "react";
import { connect } from "react-redux";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { addProvider, authenticate } from "../actions/";
import Title from "./Title";
import axios from "axios";
import { NavLink } from "react-router-dom";

class Register extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    description: "",
    industry: ""
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
        <Title>Register</Title>
        <Row>
          <Col style={{ width: "40vw" }}>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  name="name"
                  placeholder="Enter name..."
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </Form.Group>
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
              <Form.Group controlId="description">
                <Form.Label>Description (optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="5"
                  name="description"
                  placeholder="Enter description..."
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="industry">
                <Form.Label>Industry</Form.Label>
                <Form.Control
                  as="select"
                  onChange={this.handleChange}
                  value={this.state.industry || ""}
                  name="industry"
                >
                  <option value="">Choose industry</option>
                  {this.props.industries.all.map(e => (
                    <option value={e} key={e}>
                      {this.props.industries[e].name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
            <br />
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  axios
                    .post(`/providers`, this.state)
                    .then(res => {
                      console.log("res", res);
                      axios.post("/authenticate", this.state).then(r => {
                        console.log(`Item - logged successfully`);
                        var expires = "";
                        var date = new Date();
                        date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
                        expires = "; expires=" + date.toUTCString();
                        document.cookie = "token=" + (r.data.token || "") + expires + "; path=/";
                        this.props.authenticate({ token: r.data, user: res.data });
                        this.props.addProvider(res.data);
                        alert(res.status + " " + res.statusText);
                        this.props.history.push("/");
                      });
                    })
                    .catch(e => {
                      alert("Failed");
                      console.log("Register failed , Error ", e);
                    });
                }}
              >
                <Form.Group className="text-right">
                  <NavLink to="/login" className="mr-3">
                    Already have an account?
                  </NavLink>
                  <Button variant="success" type="submit">
                    &nbsp;&nbsp;Register&nbsp;&nbsp;
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
  addProvider,
  authenticate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
