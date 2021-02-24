import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Card, Row, Col, Form, Button, Jumbotron } from "react-bootstrap";
import { addProject, updateProject, deleteProject } from "../actions";
import axios from "axios";

import "./ProjectForm.css";

const CharacteristicCard = props => (
  <Col xs={6} sm={12} md={4} className="mb-3 px-2">
    <Card
      className={
        "characteristic-card cursor-pointer shadow-sm d-flex justify-content-end text-center " +
        (props.checked && "checked")
      }
      onClick={props.onClick}
    >
      <p>{props.characteristic.name}</p>
    </Card>
  </Col>
);

class ProjectForm extends Component {
  state = {
    name: "",
    description: "",
    characteristics: [],
    ...this.props.project
  };

  createRequest = (method, pid, saveOnly) => {
    if (method === "PUT") {
      console.log("PUT", this.state);
      axios
        .put("/projects/" + pid, this.state)
        .then(res => {
          console.log("res", res);
          console.log(`Item - ${res.data.name} added successfully`);
          this.props.updateProject(res.data);
          alert(res.status + " " + res.statusText);
          if (saveOnly) {
            this.props.history.push("/projects#" + res.data.id);
          } else {
            this.props.history.push("/find/" + res.data.id);
          }
        })
        .catch(e => {
          alert("Failed");
          console.log("Update failed , Error ", e);
        });
    } else {
      let body = { ...this.state };
      body._id = undefined;
      console.log(body)
      axios
        .post("/projects", body)
        .then(res => {
          console.log("res", res);
          console.log(`Item - ${res.data.name} added successfully`);
          this.props.addProject(res.data);
          alert(res.status + " " + res.statusText);
          if (saveOnly) {
            this.props.history.push("/projects#" + res.data.id);
          } else {
            this.props.history.push("/find/" + res.data.id);
          }
        })
        .catch(e => {
          alert("Failed");
          console.log("Addition failed , Error ", e);
        });
    }
  };

  toggleCharacteristic = id => {
    let found = false;
    this.state.characteristics.forEach((c, idx) => {
      if (c.id === id) {
        found = true;
        this.setState(prevState => {
          let characteristics = [...prevState.characteristics];
          console.log(idx, "idx");
          characteristics.splice(idx, 1);
          return { characteristics };
        });
      }
    });
    if (!found) {
      this.setState(prevState => ({
        characteristics: [
          ...prevState.characteristics,
          { id: id, weight: "", ref: "", rule: "", value: "" }
        ]
      }));
    }
  };

  handleChange = e => {
    let split = e.currentTarget.name.split(".");
    let key = null;
    let idx = null;
    let item = null;
    switch (split.length) {
      case 2:
        key = split[0];
        idx = split[1];
        item = this.state[key];
        item[idx] = e.currentTarget.value;
        this.setState({ [key]: item });
        break;
      case 3:
        key = split[0];
        idx = split[1];
        let prop = split[2];
        item = this.state[key][idx];
        item[prop] = e.currentTarget.value;
        if (prop === "value") {
          item[prop] = e.currentTarget.value.replace(/\s*,\s*/g, ",").split(",");
        }
        this.setState({ [key[idx]]: item });
        break;
      default:
        this.setState({ [e.currentTarget.name]: e.currentTarget.value });
        break;
    }
  };

  render() {
    return (
      <Container fluid className="find">
        <Row>
          <Col xs={12} sm={6} lg={4} className="column-left">
            <h5 className="pt-3">Characteristics</h5>
            <p>Organisational</p>
            <Row className="mb-4">
              {this.props.organisational.length ? (
                this.props.organisational
                  .sort()
                  .map((c, idx) => (
                    <CharacteristicCard
                      checked={this.state.characteristics.map(e => e.id).includes(c)}
                      key={idx}
                      characteristic={this.props.characteristics[c]}
                      onClick={() => this.toggleCharacteristic(c)}
                    />
                  ))
              ) : (
                <Col className="px-2">N/A</Col>
              )}
            </Row>
            <p>Human</p>
            <Row className="mb-4">
              {this.props.human.length ? (
                this.props.human
                  .sort()
                  .map((c, idx) => (
                    <CharacteristicCard
                      checked={this.state.characteristics.map(e => e.id).includes(c)}
                      key={idx}
                      characteristic={this.props.characteristics[c]}
                      onClick={() => this.toggleCharacteristic(c)}
                    />
                  ))
              ) : (
                <Col className="px-2">N/A</Col>
              )}
            </Row>
            <p>Application Domain</p>
            <Row className="mb-4">
              {this.props.applicationDomain.length ? (
                this.props.applicationDomain
                  .sort()
                  .map((c, idx) => (
                    <CharacteristicCard
                      checked={this.state.characteristics.map(e => e.id).includes(c)}
                      key={idx}
                      characteristic={this.props.characteristics[c]}
                      onClick={() => this.toggleCharacteristic(c)}
                    />
                  ))
              ) : (
                <Col className="px-2">N/A</Col>
              )}
            </Row>
            <p>Development Strategy</p>
            <Row className="mb-4">
              {this.props.developmentStrategy.length ? (
                this.props.developmentStrategy
                  .sort()
                  .map((c, idx) => (
                    <CharacteristicCard
                      checked={this.state.characteristics.map(e => e.id).includes(c)}
                      key={idx}
                      characteristic={this.props.characteristics[c]}
                      onClick={() => this.toggleCharacteristic(c)}
                    />
                  ))
              ) : (
                <Col className="px-2">N/A</Col>
              )}
            </Row>
            <p>Others</p>
            <Row className="mb-4">
              {this.props.others.length ? (
                this.props.others
                  .sort()
                  .map((c, idx) => (
                    <CharacteristicCard
                      checked={this.state.characteristics.map(e => e.id).includes(c)}
                      key={idx}
                      characteristic={this.props.characteristics[c]}
                      onClick={() => this.toggleCharacteristic(c)}
                    />
                  ))
              ) : (
                <Col className="px-2">N/A</Col>
              )}
            </Row>
          </Col>
          <Col xs={12} sm={6} lg={8} className="column-right">
            {this.props.project ? (
              <React.Fragment>
                <h5 className="pt-3">Edit Project</h5>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    axios
                      .delete(`/projects/${this.props.project.id}`)
                      .then(res => {
                        console.log("res", res);
                        console.log(`Item - deleted successfully`);
                        this.props.deleteProject(this.props.project.id);
                        alert(res.status + " " + res.statusText);
                        this.props.history.push("/projects");
                      })
                      .catch(e => {
                        alert("Failed");
                        console.log("Delete failed , Error ", e);
                      });
                  }}
                >
                  <Button
                    variant="link"
                    type="submit"
                    className="btn-lg position-absolute mt-1"
                    style={{ top: 0, right: 0 }}
                  >
                    <i className="far fa-trash-alt" />
                  </Button>
                </form>
              </React.Fragment>
            ) : (
              <h5 className="pt-3">Find Method Chunks</h5>
            )}
            <h6 className="pt-3">Define Project</h6>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  name="name"
                  placeholder="Enter name"
                  value={this.state.name || ""}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description (optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="5"
                  name="description"
                  placeholder="Enter project description..."
                  value={this.state.description || ""}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <h6 className="pt-3">Characteristics</h6>
              <Jumbotron className={this.state.characteristics.length && "d-none"}>
                <p className="text-secondary">
                  Choose characteristics from the left sidebar to start.
                </p>
              </Jumbotron>
              {this.state.characteristics.map((e, idx) => (
                <Form.Row key={e.id}>
                  <Form.Group as={Col} md={2} controlId="cname">
                    {this.props.characteristics[this.state.characteristics[idx].id].name}
                    <Form.Control type="hidden" value={this.props.characteristics[e.id].name} />
                  </Form.Group>

                  <Form.Group as={Col} md={2} controlId="cweight">
                    <Form.Label>Weight (optional)</Form.Label>
                    <Form.Control
                      placeholder="Enter weight"
                      value={this.state.characteristics[idx].weight || ""}
                      name={"characteristics." + idx + ".weight"}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md={2} controlId="cref">
                    <Form.Label>Ref</Form.Label>
                    <Form.Control
                      as="select"
                      value={this.state.characteristics[idx].ref || ""}
                      name={"characteristics." + idx + ".ref"}
                      onChange={this.handleChange}
                    >
                      <option value="">Choose ref</option>
                      {this.props.characteristics[e.id].characteristicValues.map(cv => (
                        <option value={cv.ref} key={cv.ref}>
                          {cv.ref}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} md={2} controlId="crule">
                    <Form.Label>Rule</Form.Label>
                    <Form.Control
                      as="select"
                      value={this.state.characteristics[idx].rule || ""}
                      name={"characteristics." + idx + ".rule"}
                      onChange={this.handleChange}
                    >
                      <option value="">Choose rule</option>
                      {this.state.characteristics[idx].ref ? (
                        this.props.characteristics[
                          this.state.characteristics[idx].id
                        ].characteristicValues.find(
                          cv => cv.ref === this.state.characteristics[idx].ref
                        ).isQuantifiable ? (
                          <React.Fragment>
                            <option value="minimum">minimum</option>
                            <option value="maximum">maximum</option>
                            <option value="exact">exact</option>
                            <option value="preference_list">preference_list</option>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <option value="exact">exact</option>
                            <option value="preference_list">preference_list</option>
                          </React.Fragment>
                        )
                      ) : (
                        ""
                      )}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    controlId="cvalue"
                    className={
                      ["exact", "preference_list"].includes(this.state.characteristics[idx].rule)
                        ? ""
                        : "invisible"
                    }
                  >
                    <Form.Label>
                      Value{" "}
                      {this.state.characteristics[idx].rule === "preference_list"
                        ? "(ex. low,normal,high)"
                        : "(ex. low)"}
                    </Form.Label>
                    <Form.Control
                      placeholder="Enter value"
                      value={this.state.characteristics[idx].value}
                      name={"characteristics." + idx + ".value"}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button variant="link" onClick={() => this.toggleCharacteristic(e.id)}>
                      Remove
                    </Button>
                  </Form.Group>
                </Form.Row>
              ))}
            </Form>
            <br />
            {this.props.project ? (
              this.state.name === this.props.project.name ? (
                <div className="text-right">
                  <Button
                    variant="primary"
                    className="mr-2"
                    onClick={() => this.createRequest("PUT", this.props.project.id, "saveOnly")}
                  >
                    &nbsp;&nbsp;Save&nbsp;&nbsp;
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => this.createRequest("PUT", this.props.project.id, "")}
                  >
                    &nbsp;&nbsp;Save & Find&nbsp;&nbsp;
                  </Button>
                </div>
              ) : (
                <div className="text-right">
                  <Button
                    variant="primary"
                    className="mr-2"
                    onClick={() => this.createRequest("POST", "", "saveOnly")}
                  >
                    &nbsp;&nbsp;Save&nbsp;&nbsp;
                  </Button>
                  <Button
                    variant="success"
                    className="text-right"
                    onClick={() => this.createRequest("POST", "", "")}
                  >
                    &nbsp;&nbsp;Save & Find&nbsp;&nbsp;
                  </Button>
                </div>
              )
            ) : (
              <Button
                variant="success"
                className="float-right"
                onClick={() => this.createRequest("POST", "", "")}
              >
                &nbsp;&nbsp;Save & Find&nbsp;&nbsp;
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = {
  addProject,
  updateProject,
  deleteProject
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectForm);
