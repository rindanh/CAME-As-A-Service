import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Title from "./Title";
import "./pages.css";
import { NavLink } from "react-router-dom";

class ProviderItem extends Component {
  render() {
    // console.log("props", this.props);
    return (
      <Container fluid className="pt-3">
        <Row>
          <Col md={{ span: 5, offset: 2 }}>
            <NavLink to="/providers">&laquo; Back</NavLink>
          </Col>
        </Row>
        <Title xs={12} md={{ span: 8, offset: 2 }}>
          {this.props.provider.name}{" "}
          <NavLink to={`/providers/${this.props.provider.id}/edit`}>
            <i className="far fa-edit" />
          </NavLink>
        </Title>
        <Row>
          <Col md={{ span: 5, offset: 2 }}>
            <h6>Description</h6>
            <p>{this.props.provider.description || "N/A"}</p>
            <h6>Useful links</h6>
            {this.props.provider.urls.length ? (
              <ol>
                {this.props.provider.urls.map((e, idx) => (
                  <li key={idx}>
                    {e.name} - <a href={`/${e.url}`}>{e.url}</a>
                  </li>
                ))}
              </ol>
            ) : (
              <p>N/A</p>
            )}
            <h6>Contacts</h6>
            {this.props.provider.contacts.length ? (
              <ul>
                {this.props.provider.contacts.map((e, idx) => (
                  <li key={idx}>
                    {e.name}
                    <br />
                    {e.role}
                    <br />
                    {e.description}
                    <br />
                    {e.email} {e.phone} {e.address}
                  </li>
                ))}
              </ul>
            ) : (
              <p>N/A</p>
            )}
            <h6>Method chunks</h6>
            {this.props.methodChunks.length ? (
              <ul>
                {this.props.methodChunks.map((e, idx) => (
                  <li key={idx}>
                    <NavLink to={`/method-chunks#${e.id}`}>{e.name}</NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>N/A</p>
            )}
            <h6>Projects</h6>
            {this.props.projects.length ? (
              <ul>
                {this.props.projects.map((e, idx) => (
                  <li key={idx}>
                    <NavLink to={`/projects#${e.id}`}>{e.name}</NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>N/A</p>
            )}
          </Col>
          <Col xs={3}>
            <p>Industry: {this.props.industry.name}</p>
            <br />
            <h6>Last updated</h6>
            <p>{this.props.provider.updatedAt}</p>
            {this.props.provider.relatedProviders.length ? (
              <React.Fragment>
                <br />
                <h6>Related providers</h6>
                <ul>
                  {this.props.provider.relatedProviders.map((e, idx) => (
                    <li key={idx}>
                      <NavLink to={`/providers/${e}`}>{this.props.providers[e].name}</NavLink>
                    </li>
                  ))}
                </ul>
              </React.Fragment>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ProviderItem;
