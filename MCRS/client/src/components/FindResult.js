import React, { Component } from "react";
import { Container, Row, Col, Spinner, Tabs, Tab } from "react-bootstrap";
import Title from "./Title";
import "./pages.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
class FindResult extends Component {
  _isMounted = false;

  state = {
    data: {},
    loading: true,
    error: null
  };

  componentDidMount() {
    this._isMounted = true;
    let provider = this.props.match.params.provider;
    let project = this.props.match.params.project;
    let pid = provider + "/" + project;
    const data = {
      project: pid
    };
    if (this.state.data.results && !this.state.error) {
      console.log("State", this.state.data);
      return;
    }
    return axios
      .post("/find", data)
      .then(({ data }) => {
        if (this._isMounted) {
          this.setState({
            data,
            loading: false,
            error: null
          });
        }
        console.log("Find success", data);
      })
      .catch(error => {
        console.log("Error", error);
        if (this._isMounted) {
          this.setState({
            data: {},
            loading: false,
            error: error
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Container fluid className="pt-3">
        <Row>
          <Col md={{ span: 5, offset: 2 }}>
            <NavLink
              to={`/projects/${this.props.match.params.provider}/${
                this.props.match.params.project
              }/edit`}
            >
              &laquo; Back
            </NavLink>
          </Col>
        </Row>
        <Title xs={12} md={{ span: 8, offset: 2 }}>
          Result
        </Title>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            {this.state.loading ? (
              <Spinner animation="border" />
            ) : this.state.error ? (
              "Failed. Please try again."
            ) : this.state.data && this.state.data.results ? (
              <Tabs>
                {this.state.data.results.map(e => (
                  <Tab eventKey={e.model} title={e.model} key={e.model}>
                    <h5 className="pt-3">{e.model}</h5>
                    {e.values.map((i, idx) => (
                      <Row key={idx}>
                        <Col>
                          <p>
                            {i.rank}:{" "}
                            <NavLink to={"/method-chunks#" + i.methodChunk.id}>
                              {i.methodChunk.name}
                            </NavLink>
                            {<br />}
                            {"Score: " + i.score}
                          </p>
                        </Col>
                        <Col md={7}>
                          Characteristics:
                          <ul>
                            {i.methodChunk.characteristics.map((e, idx) => (
                              <li key={e.id + "" + e.ref}>
                                {e.id}: {e.value} (ref: {e.ref})
                              </li>
                            ))}
                          </ul>
                        </Col>
                      </Row>
                    ))}
                  </Tab>
                ))}
                <Tab eventKey="project" title="Project">
                  <h5 className="pt-3">Project</h5>
                  <h6>Name</h6>
                  <p>{this.state.data.project.name}</p>
                  <h6>Description</h6>
                  <p>{this.state.data.project.description}</p>
                  <h6>Owner</h6>
                  <p>
                    {this.props.providers[this.state.data.project.provider].name ||
                      this.state.data.project.provider}
                  </p>
                  <h6>Characteristics</h6>
                  <ul>
                    {this.state.data.project.characteristics.map((i, idx) => (
                      <li key={i.id + " " + i.ref + " " + i.rule}>
                        {i.id} (W.{i.weight}). {i.rule} {i.value.join(",")} (ref. {i.ref})
                      </li>
                    ))}
                  </ul>
                </Tab>
              </Tabs>
            ) : (
              "No match found"
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FindResult;
