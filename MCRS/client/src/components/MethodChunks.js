import React, { Component } from "react";
import { Container, Row, Col, Card, Form, FormControl, Button } from "react-bootstrap";
import Title from "./Title";
import "./pages.css";
import { NavLink } from "react-router-dom";

const MethodChunk = props => {
  return (
    <Col xs={props.xs || 12} md={props.md} id={props.methodChunk.id}>
      <Card className="mc-card mb-3">
        <Card.Body>
          <Row>
            <Col md={8}>
              <Card.Title>
                {props.methodChunk.name}{" "}
                <NavLink to={`/method-chunks/${props.methodChunk.id}/edit`}>
                  <i className="far fa-edit" />
                </NavLink>
              </Card.Title>
            </Col>
            <Col md={4} className="text-right">
              Provider:{" "}
              <NavLink to={`/providers/${props.methodChunk.provider}`}>
                {props.provider ? props.provider.name : props.methodChunk.provider}
              </NavLink>
            </Col>
          </Row>
          <div className="description mb-1">{props.methodChunk.description}</div>
          <h6>Characteristics</h6>
          <table className="table">
            <thead>
              <tr>
                <th>id</th>
                <th>value</th>
                <th>ref</th>
              </tr>
            </thead>
            <tbody>
              {props.methodChunk.characteristics.map((el, idx) => (
                <tr key={idx}>
                  <td>{el.id}</td>
                  <td>{el.value}</td>
                  <td>{el.ref || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h6>Location</h6>
          <a href={props.methodChunk.url}>{props.methodChunk.url}</a>
        </Card.Body>
      </Card>
    </Col>
  );
};

class MethodChunks extends Component {
  state = {
    containerSize: { span: 8, offset: 2 },
    cardSize: { span: 8, offset: 2 },
    viewMode: "list",
    scroll: this.props.location.hash || ""
  };

  componentDidMount() {
    if (this.state.scroll && document.querySelector(this.state.scroll))
      window.scrollTo(0, document.querySelector(this.state.scroll).offsetTop);
  }

  handleChange = e => {
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = this.props.methodChunks.all;

      newList = currentList.filter(i => {
        let item = this.props.methodChunks[i];
        const lc = item.name.toLowerCase();
        const lcd = item.description ? item.description.toLowerCase() : "";
        const lcp = this.props.providers[item.provider].name.toLowerCase();
        const lcc = item.characteristics
          .map(e => e.id)
          .toString()
          .toLowerCase();
        const lcv = item.characteristics
          .map(e => e.value)
          .toString()
          .toLowerCase();
        const lcr = item.characteristics
          .map(e => e.ref)
          .toString()
          .toLowerCase();
        const lcu = item.url.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return (
          lc.includes(filter) ||
          lcp.includes(filter) ||
          lcd.includes(filter) ||
          lcc.includes(filter) ||
          lcv.includes(filter) ||
          lcr.includes(filter) ||
          lcu.includes(filter)
        );
      });
    } else {
      newList = this.props.methodChunks.all;
    }
    this.setState({
      filtered: newList
    });
  };

  toggleViewMode = () => {
    this.setState(prevState => {
      if (prevState.viewMode === "grid") {
        return {
          viewMode: "list",
          containerSize: { span: 8, offset: 2 },
          cardSize: { span: 8, offset: 2 }
        };
      } else if (prevState.viewMode === "list") {
        return {
          viewMode: "grid",
          containerSize: 12,
          cardSize: 4
        };
      }
    });
  };
  render() {
    // console.log("props", this.props);
    // console.log("s", this.state);
    return (
      <Container fluid className="pt-3 pb-5">
        <Title xs={12} md={this.state.containerSize}>
          Method Chunks
        </Title>
        <Row className="mb-3">
          <Col xs={12} md={this.state.containerSize}>
            <Form inline onSubmit={e => e.preventDefault()}>
              Search:
              <FormControl
                onChange={this.handleChange}
                type="text"
                placeholder="Search"
                className="ml-md-2"
              />
              <div className="d-none d-md-block ml-auto">
                <NavLink to="/publish" className="mr-3">
                  Add new method chunk...
                </NavLink>
                <Button
                  variant="outline-secondary"
                  onClick={this.toggleViewMode}
                  className="button-view-mode"
                >
                  {this.state.viewMode === "list" ? (
                    <i className="fas fa-th" />
                  ) : (
                    <i className="fas fa-bars" />
                  )}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
        <Row className="mc">
          {this.state.filtered ? (
            this.state.filtered.map((el, idx) => (
              <MethodChunk
                history={this.props.history}
                md={this.state.cardSize}
                methodChunk={this.props.methodChunks[el]}
                provider={this.props.providers[this.props.methodChunks[el].provider]}
                key={idx}
                grid
              />
            ))
          ) : this.props.methodChunks.all.length ? (
            this.props.methodChunks.all
              .sort()
              .map((el, idx) => (
                <MethodChunk
                  history={this.props.history}
                  md={this.state.cardSize}
                  methodChunk={this.props.methodChunks[el]}
                  provider={this.props.providers[this.props.methodChunks[el].provider]}
                  key={idx}
                  grid
                />
              ))
          ) : (
            <Col xs={12} md={{ span: 8, offset: 2 }}>
              Empty
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}

export default MethodChunks;
