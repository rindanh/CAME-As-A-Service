import React from "react";
import { connect } from "react-redux";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { addMethodChunk, updateMethodChunk, deleteMethodChunk } from "../actions/";
import Title from "./Title";
import axios from "axios";
import { ORGANISATIONAL, HUMAN, APPLICATION_DOMAIN, DEVELOPMENT_STRATEGY } from "./Characteristics";

class MethodChunkForm extends React.Component {
  state = {
    name: "",
    description: "",
    url: "",
    characteristics: [
      {
        id: "",
        ref: "",
        value: ""
      }
    ],
    ...this.props.methodChunk
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  handleCChange = e => {
    let split = e.currentTarget.name.split(".");
    let characteristics = this.state.characteristics;
    let c = characteristics[split[1]];
    c[split[2]] = e.currentTarget.value;
    let select = e.currentTarget;
    if (split[2] === "value")
      c["ref"] = select.options[select.selectedIndex].getAttribute("data-ref");
    console.log(characteristics);
    this.setState({ [split[0]]: characteristics });
  };

  addCharacteristic = () => {
    this.setState(prevState => ({
      characteristics: [...prevState.characteristics, { id: "", ref: "", value: "" }]
    }));
  };

  removeCharacteristic = id => {
    this.setState(prevState => {
      let characteristics = [...prevState.characteristics];
      characteristics.splice(id, 1);
      return { characteristics };
    });
  };

  render() {
    console.log("props", this.props);
    console.log("state", this.state);
    return (
      <Container fluid className="pt-3 pb-5">
        <Title xs={12} md={{ span: 8, offset: 2 }}>
          {this.props.methodChunk ? (
            <React.Fragment>
              Edit Method Chunk
              <form
                onSubmit={e => {
                  e.preventDefault();
                  axios
                    .delete(`/method-chunks/${this.props.methodChunk.id}`)
                    .then(res => {
                      console.log("res", res);
                      console.log(`Item - deleted successfully`);
                      this.props.deleteMethodChunk(this.props.methodChunk.id);
                      alert(res.status + " " + res.statusText);
                      this.props.history.push("/method-chunks");
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
            "Publish"
          )}
        </Title>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  name="name"
                  placeholder="Enter name..."
                  value={this.state.name}
                  onChange={this.handleChange}
                  plaintext={this.props.methodChunk}
                  readOnly={this.props.methodChunk}
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

              <Form.Group controlId="url">
                <Form.Label>URL</Form.Label>
                <Form.Control
                  type="text"
                  name="url"
                  placeholder="Enter location url..."
                  value={this.state.url}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <h5 className="pt-3">Characteristics</h5>
              {this.state.characteristics.map((e, idx) => (
                <Form.Row key={idx}>
                  <Form.Group as={Col} controlId="cid">
                    <Form.Control
                      as="select"
                      onChange={this.handleCChange}
                      value={this.state.characteristics[idx].id || ""}
                      name={"characteristics." + idx + ".id"}
                    >
                      <option value="">Choose characteristic</option>
                      <optgroup label="">
                        {this.props.others.map(e => (
                          <option value={e} key={e}>
                            {this.props.characteristics[e].name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label={ORGANISATIONAL}>
                        {this.props.organisational.map(e => (
                          <option value={e} key={e}>
                            {this.props.characteristics[e].name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label={HUMAN}>
                        {this.props.human.map(e => (
                          <option value={e} key={e}>
                            {this.props.characteristics[e].name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label={APPLICATION_DOMAIN}>
                        {this.props.applicationDomain.map(e => (
                          <option value={e} key={e}>
                            {this.props.characteristics[e].name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label={DEVELOPMENT_STRATEGY}>
                        {this.props.developmentStrategy.map(e => (
                          <option value={e} key={e}>
                            {this.props.characteristics[e].name}
                          </option>
                        ))}
                      </optgroup>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} md={6} controlId="value">
                    <Form.Control
                      as="select"
                      name={"characteristics." + idx + ".value"}
                      value={this.state.characteristics[idx].value || ""}
                      onChange={this.handleCChange}
                    >
                      <option value="">Choose value</option>
                      {this.state.characteristics[idx].id &&
                        this.props.characteristics[
                          this.state.characteristics[idx].id
                        ].characteristicValues.map(e => (
                          <optgroup
                            key={this.state.characteristics[idx].id + " " + e.ref}
                            label={e.ref}
                          >
                            {e.values.map((v, id) => (
                              <option
                                key={this.state.characteristics[idx].id + +" " + e.ref + " " + v}
                                data-ref={e.ref}
                                value={v}
                              >
                                {v}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className={idx === 0 && "invisible"}>
                    <Button variant="link" onClick={() => this.removeCharacteristic(idx)}>
                      Remove
                    </Button>
                  </Form.Group>
                </Form.Row>
              ))}
              <Form.Group className="d-flex justify-content-center">
                <Button variant="link" onClick={this.addCharacteristic}>
                  <i className="fas fa-plus-circle" /> Add characteristic
                </Button>
              </Form.Group>
            </Form>
            <br />
            {this.props.methodChunk ? (
              <div>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    axios
                      .put(`/method-chunks/${this.props.methodChunk.id}`, this.state)
                      .then(res => {
                        console.log("res", res);
                        console.log(`Item - ${res.data.name} updated successfully`);
                        this.props.updateMethodChunk(res.data);
                        alert(res.status + " " + res.statusText);
                        this.props.history.push("/method-chunks#" + res.data.id);
                      })
                      .catch(e => {
                        alert("Failed");
                        console.log("Update failed , Error ", e);
                      });
                  }}
                >
                  <Form.Group className="text-right">
                    <Button variant="success" type="submit">
                      &nbsp;&nbsp;Save&nbsp;&nbsp;
                    </Button>
                  </Form.Group>
                </form>
              </div>
            ) : (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  axios
                    .post("/method-chunks", this.state)
                    .then(res => {
                      console.log("res", res);
                      console.log(`Item - ${res.data.name} added successfully`);
                      this.props.addMethodChunk(res.data);
                      alert(res.status + " " + res.statusText);
                      this.props.history.push("/method-chunks#" + res.data.id);
                    })
                    .catch(e => {
                      alert("Failed");
                      console.log("Addition failed , Error ", e);
                    });
                }}
              >
                <Button variant="success" type="submit" className="float-right">
                  &nbsp;&nbsp;Save&nbsp;&nbsp;
                </Button>
              </form>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = {
  addMethodChunk,
  updateMethodChunk,
  deleteMethodChunk
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MethodChunkForm);
