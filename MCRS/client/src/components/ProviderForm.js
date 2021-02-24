import React from "react";
import { connect } from "react-redux";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { addProvider, updateProvider, deleteProvider } from "../actions/";
import Title from "./Title";
import axios from "axios";
import NotFound from "./NotFound";

class ProviderForm extends React.Component {
  state = {
    name: "",
    email: "",
    description: "",
    industry: "",
    urls: [
      {
        url: "",
        name: ""
      }
    ],
    contacts: [
      {
        name: "",
        role: "",
        description: "",
        address: "",
        email: "",
        phone: ""
      }
    ],
    relatedProviders: [],
    ...this.props.provider
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
        this.setState({ [key[idx]]: item });
        break;
      default:
        this.setState({ [e.currentTarget.name]: e.currentTarget.value });
        break;
    }
  };

  addUrl = () => {
    this.setState(prevState => ({
      urls: [...prevState.urls, { url: "", name: "" }]
    }));
  };

  removeUrl = id => {
    this.setState(prevState => {
      let urls = [...prevState.urls];
      urls.splice(id, 1);
      return { urls };
    });
  };

  addContact = () => {
    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        { name: "", role: "", description: "", address: "", email: "", phone: "" }
      ]
    }));
  };

  removeContact = id => {
    this.setState(prevState => {
      let contacts = [...prevState.contacts];
      contacts.splice(id, 1);
      return { contacts };
    });
  };

  addRelated = () => {
    this.setState(prevState => ({
      relatedProviders: [...prevState.relatedProviders, ""]
    }));
  };

  removeRelated = id => {
    this.setState(prevState => {
      let relatedProviders = [...prevState.relatedProviders];
      relatedProviders.splice(id, 1);
      return { relatedProviders };
    });
  };

  render() {
    console.log("props", this.props);
    console.log("state", this.state);
    if (!this.props.provider) return <NotFound />;
    return (
      <Container fluid className="pt-3 pb-5">
        <Title xs={12} md={{ span: 8, offset: 2 }}>
          <React.Fragment>
            Edit Provider
            <form
              onSubmit={e => {
                e.preventDefault();
                axios
                  .delete(`/providers/${this.props.provider.id}`)
                  .then(res => {
                    console.log("res", res);
                    console.log(`Item - deleted successfully`);
                    this.props.deleteProvider(this.props.provider.id);
                    alert(res.status + " " + res.statusText);
                    this.props.history.push("/providers");
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
                  plaintext={this.props.provider}
                  readOnly={this.props.provider}
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
                  plaintext={this.props.provider}
                  readOnly={this.props.provider}
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

              <h5 className="pt-3">URLs</h5>
              {this.state.urls.map((e, idx) => (
                <Form.Row key={idx}>
                  <Form.Group as={Col} md={7} controlId="url">
                    <Form.Label>URL link</Form.Label>
                    <Form.Control
                      placeholder="Enter url..."
                      onChange={this.handleChange}
                      value={this.state.urls[idx].url || ""}
                      name={"urls." + idx + ".url"}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      placeholder="Enter name..."
                      onChange={this.handleChange}
                      value={this.state.urls[idx].name || ""}
                      name={"urls." + idx + ".name"}
                    />
                  </Form.Group>
                  <Form.Group className={"d-flex"}>
                    <Button variant="link" onClick={() => this.removeUrl(idx)} className="mt-auto">
                      Remove
                    </Button>
                  </Form.Group>
                </Form.Row>
              ))}
              <Form.Group className="d-flex justify-content-center">
                <Button variant="link" onClick={this.addUrl}>
                  <i className="fas fa-plus-circle" /> Add url
                </Button>
              </Form.Group>
              <h5 className="pt-3">Contacts</h5>
              {this.state.contacts.map((e, idx) => (
                <React.Fragment key={idx}>
                  <Form.Row>
                    <Form.Group as={Col} controlId="cname">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        placeholder="Enter name..."
                        onChange={this.handleChange}
                        value={this.state.contacts[idx].name || ""}
                        name={"contacts." + idx + ".name"}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="crole">
                      <Form.Label>Role/Job (optional)</Form.Label>
                      <Form.Control
                        placeholder="Enter role..."
                        onChange={this.handleChange}
                        value={this.state.contacts[idx].role || ""}
                        name={"contacts." + idx + ".role"}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="cdescription">
                      <Form.Label>Description (optional)</Form.Label>
                      <Form.Control
                        placeholder="Enter description..."
                        onChange={this.handleChange}
                        value={this.state.contacts[idx].description || ""}
                        name={"contacts." + idx + ".description"}
                      />
                    </Form.Group>
                    <Form.Group className={"d-flex"}>
                      <Button
                        variant="link"
                        onClick={() => this.removeContact(idx)}
                        className="mt-auto"
                      >
                        Remove
                      </Button>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} controlId="caddress">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        placeholder="Enter address..."
                        onChange={this.handleChange}
                        value={this.state.contacts[idx].address || ""}
                        name={"contacts." + idx + ".address"}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="cemail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        placeholder="Enter email..."
                        onChange={this.handleChange}
                        value={this.state.contacts[idx].email || ""}
                        name={"contacts." + idx + ".email"}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="cphone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        placeholder="Enter phone..."
                        onChange={this.handleChange}
                        value={this.state.contacts[idx].phone || ""}
                        name={"contacts." + idx + ".phone"}
                      />
                    </Form.Group>
                    <Form.Group className="invisible">
                      <Button variant="link">Remove</Button>
                    </Form.Group>
                  </Form.Row>
                </React.Fragment>
              ))}
              <Form.Group className="d-flex justify-content-center">
                <Button variant="link" onClick={this.addContact}>
                  <i className="fas fa-plus-circle" /> Add contact
                </Button>
              </Form.Group>
              <h5 className="pt-3">Related providers</h5>
              {this.state.relatedProviders.map((e, idx) => (
                <Form.Row key={idx}>
                  <Form.Group as={Col} md={7} controlId="related">
                    <Form.Control
                      as="select"
                      onChange={this.handleChange}
                      value={this.state.relatedProviders[idx] || ""}
                      name={"relatedProviders." + idx}
                    >
                      <option value="">Choose provider</option>
                      {this.props.providers.all.map(e => (
                        <option value={e} key={e}>
                          {this.props.providers[e].name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className={"d-flex"}>
                    <Button
                      variant="link"
                      onClick={() => this.removeRelated(idx)}
                      className="mt-auto"
                    >
                      Remove
                    </Button>
                  </Form.Group>
                </Form.Row>
              ))}
              <Form.Group className="d-flex justify-content-center">
                <Button variant="link" onClick={this.addRelated}>
                  <i className="fas fa-plus-circle" /> Add provider
                </Button>
              </Form.Group>
            </Form>
            <br />
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  axios
                    .put(`/providers/${this.props.provider.id}`, this.state)
                    .then(res => {
                      console.log("res", res);
                      console.log(`Item - ${res.data.name} updated successfully`);
                      this.props.updateProvider(res.data);
                      alert(res.status + " " + res.statusText);
                      this.props.history.push("/providers/" + res.data.id);
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
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = {
  addProvider,
  updateProvider,
  deleteProvider
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProviderForm);
