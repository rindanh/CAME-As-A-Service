import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { METHOD_CHUNKS } from "./methodChunks";
import { NavLink } from "react-router-dom";
import { post } from "./Browse";

class MethodChunk extends React.Component {
  state = {
    mc: METHOD_CHUNKS[this.props.match.params.nameId]
  };

  renderAlpha(e) {
    return (
      <div className="pl-3" key={e.nameId}>
        <b>{e.name + ": "}</b>
        <p>{e.description}</p>
      </div>
    );
  }

  renderActivity(e) {
    return (
      <div className="pl-3" key={e.nameId}>
        <b>{e.name + ": "}</b>
        <p>{e.description}</p>
      </div>
    );
  }
  renderCharacteristics(e) {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>value</th>
            <th>ref</th>
          </tr>
        </thead>
        <tbody>
          {e.map(e => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.value}</td>
              <td>{e.ref}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  renderCompetency(e) {
    return (
      <div className="pl-3" key={e.nameId}>
        <b>{e.name + "(" + e.levels.map(a => a.name) + "): "}</b>
        <p>{e.description}</p>
      </div>
    );
  }
  renderPattern(e) {
    return (
      <div className="pl-3" key={e.nameId}>
        <b>{e.name + ": "}</b>
        <p>{e.description}</p>
      </div>
    );
  }
  render() {
    const { mc } = this.state;
    console.log(mc);
    return (
      <Container className="pb-5">
        <Row className="pt-4">
          <Col>
            <NavLink to="/browse">« Back</NavLink>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              onClick={() => {
                post(mc.nameId);
              }}
            >
              Publish
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="pt-4 pb-3">{mc.name}</h1>
          </Col>
          <Card className="w-100">
            <Card.Body>
              <Card.Title>Description</Card.Title>
              <Card.Text className="pl-3">{mc.description}</Card.Text>
              <Card.Title>Alphas</Card.Title>
              <div>
                {mc.alphas ? mc.alphas.map(e => this.renderAlpha(e)) : "N/A"}
              </div>
              <Card.Title>Activities</Card.Title>
              <div>
                {mc.activitySpaces
                  ? mc.activitySpaces.map(e => this.renderActivity(e))
                  : "N/A"}
              </div>
              <Card.Title>Competencies</Card.Title>
              <div>
                {mc.competencies
                  ? mc.competencies.map(e => this.renderCompetency(e))
                  : "N/A"}
              </div>
              <Card.Title>Characteristics</Card.Title>
              <div>{this.renderCharacteristics(mc.characteristics)}</div>
              <Card.Title>Pattern</Card.Title>
              <div>
                {mc.pattern
                  ? mc.pattern.map(e => this.renderPattern(e))
                  : "N/A"}
              </div>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    );
  }
}

export default MethodChunk;
