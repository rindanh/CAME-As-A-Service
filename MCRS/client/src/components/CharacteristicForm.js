import React from "react";
import { connect } from "react-redux";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { addCharacteristic, updateCharacteristic, deleteCharacteristic } from "../actions/";
import Title from "./Title";
import axios from "axios";

class CharacteristicForm extends React.Component {
  state = {
    name: "",
    description: "",
    dimension: "",
    characteristicValues: [
      {
        ref: "",
        values: [],
        isQuantifiable: false
      }
    ],
    ...this.props.characteristic
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  handleCChange = e => {
    let split = e.currentTarget.name.split(".");
    let characteristicValues = this.state.characteristicValues;
    let c = characteristicValues[split[1]];
    c[split[2]] = e.currentTarget.value;
    if (split[2] === "values") {
      c["values"] = e.currentTarget.value.replace(/\s*,\s*/g, ",").split(",");
    } else if (split[2] === "isQuantifiable") {
      c["isQuantifiable"] = e.currentTarget.checked;
    }
    this.setState({ [split[0]]: characteristicValues });
  };

  addCharacteristicValue = () => {
    this.setState(prevState => ({
      characteristicValues: [
        ...prevState.characteristicValues,
        { ref: "", values: [], isQuantifiable: false }
      ]
    }));
  };

  removeCharacteristicValue = id => {
    this.setState(prevState => {
      let characteristicValues = [...prevState.characteristicValues];
      characteristicValues.splice(id, 1);
      return { characteristicValues };
    });
  };

  render() {
    console.log("props", this.props);
    console.log("state", this.state);
    return (
      <Container fluid className="pt-3 pb-5">
        <Title xs={12} md={{ span: 8, offset: 2 }}>
          {this.props.characteristic ? (
            <React.Fragment>
              Edit Characteristic
              <form
                onSubmit={e => {
                  e.preventDefault();
                  axios
                    .delete(`/characteristics/${this.props.characteristic.id}`)
                    .then(res => {
                      console.log("res", res);
                      console.log(`Item - deleted successfully`);
                      this.props.deleteCharacteristic(this.props.characteristic.id);
                      alert(res.status + " " + res.statusText);
                      this.props.history.push("/characteristics");
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
            "Create Characteristic"
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
                  plaintext={this.props.characteristic}
                  readOnly={this.props.characteristic}
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

              <Form.Group controlId="dimension">
                <Form.Label>Dimension</Form.Label>
                <Form.Control
                  as="select"
                  onChange={this.handleChange}
                  value={this.state.dimension || ""}
                  name={"dimension"}
                >
                  <option value="">Choose dimension</option>
                  {this.props.dimensions.all.map(e => (
                    <option value={e} key={e}>
                      {this.props.dimensions[e].name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <h5 className="pt-3">Characteristic Values</h5>
              {this.state.characteristicValues.map((e, idx) => (
                <Form.Row key={idx}>
                  <Form.Group as={Col} md={6} controlId="cvalue">
                    <Form.Label>Values group #{idx + 1} (ex. low,medium,high)</Form.Label>
                    <Form.Control
                      placeholder="Enter values..."
                      onChange={this.handleCChange}
                      value={this.state.characteristicValues[idx].values.join(",") || ""}
                      name={"characteristicValues." + idx + ".values"}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="cref">
                    <Form.Label>Ref (optional)</Form.Label>
                    <Form.Control
                      placeholder="Enter ref"
                      onChange={this.handleCChange}
                      value={this.state.characteristicValues[idx].ref || ""}
                      name={"characteristicValues." + idx + ".ref"}
                    />
                  </Form.Group>
                  <Form.Group controlId="cis" className="d-flex">
                    <Form.Check
                      type="checkbox"
                      onChange={this.handleCChange}
                      checked={this.state.characteristicValues[idx].isQuantifiable || false}
                      label="isQuantifiable"
                      id={"characteristicValues." + idx + ".isQuantifiable"}
                      name={"characteristicValues." + idx + ".isQuantifiable"}
                      className="mt-auto pb-2"
                    />
                    <Button
                      variant="link"
                      onClick={() => this.removeCharacteristicValue(idx)}
                      className={"mt-auto " + (idx === 0 ? "invisible" : "")}
                    >
                      Remove
                    </Button>
                  </Form.Group>
                </Form.Row>
              ))}
              <Form.Group className="d-flex justify-content-center">
                <Button variant="link" onClick={this.addCharacteristicValue}>
                  <i className="fas fa-plus-circle" /> Add values group
                </Button>
              </Form.Group>
            </Form>
            <br />
            {this.props.characteristic ? (
              <div>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    axios
                      .put(`/characteristics/${this.props.characteristic.id}`, this.state)
                      .then(res => {
                        console.log("res", res);
                        console.log(`Item - ${res.data.name} updated successfully`);
                        this.props.updateCharacteristic(res.data);
                        alert(res.status + " " + res.statusText);
                        this.props.history.push("/characteristics#" + res.data.id);
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
                    .post("/characteristics", this.state)
                    .then(res => {
                      console.log("res", res);
                      console.log(`Item - ${res.data.name} added successfully`);
                      this.props.addCharacteristic(res.data);
                      alert(res.status + " " + res.statusText);
                      this.props.history.push("/characteristics#" + res.data.id);
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
  addCharacteristic,
  updateCharacteristic,
  deleteCharacteristic
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacteristicForm);
