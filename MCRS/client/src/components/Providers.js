import React, { Component } from "react";
import { Container, Row, Col, Card, Form, FormControl } from "react-bootstrap";
import Title from "./Title";
import "./pages.css";
import { NavLink } from "react-router-dom";

const ProviderCard = props => (
  <Col xs={12} md={{ span: 8, offset: 2 }}>
    <Card className="provider-card mb-3">
      <Card.Body>
        <Row>
          <Col md={8}>
            <Card.Title>
              {props.provider.name}{" "}
              <NavLink to={`/providers/${props.provider.id}/edit`}>
                <i className="far fa-edit" />
              </NavLink>
            </Card.Title>
          </Col>
          <Col md={4} className="text-right">
            {props.provider.industry && "Industry: " + props.industry.name}
          </Col>
        </Row>
        <Card.Text className="description">{props.provider.description}</Card.Text>
        <NavLink to={`/providers/${props.provider.id}`}>Learn more</NavLink>
      </Card.Body>
    </Card>
  </Col>
);

class Providers extends Component {
  state = {};
  handleChange = e => {
    if (this.state.loading || this.state.errors) {
      return "";
    } else {
      let currentList = [];
      let newList = [];

      if (e.target.value !== "") {
        currentList = this.props.providers.all;

        newList = currentList.filter(i => {
          let item = this.props.providers[i];
          const lc = item.name.toLowerCase();
          const lcd = item.description.toLowerCase();
          const lci = this.props.industries[item.industry].name.toLowerCase();
          const filter = e.target.value.toLowerCase();
          return lc.includes(filter) || lcd.includes(filter) || lci.includes(filter);
        });
      } else {
        newList = this.props.providers.all;
      }
      this.setState({
        filtered: newList
      });
    }
  };

  render() {
    // console.log("props", this.props);
    // console.log("state", this.state);
    return (
      <Container fluid className="pt-3 pb-5">
        <Title xs={12} md={{ span: 8, offset: 2 }}>
          Providers
        </Title>
        <Row>
          <Col xs={12} md={{ span: 8, offset: 2 }} className="mb-3">
            <Form inline onSubmit={e => e.preventDefault()}>
              Search: &nbsp;{" "}
              <FormControl
                onChange={this.handleChange}
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              {/* <div className="ml-auto">
                <NavLink to="/providers/create">Add new provider...</NavLink>
              </div> */}
            </Form>
          </Col>
        </Row>
        <Row>
          {this.state.filtered ? (
            this.state.filtered.map((el, idx) => (
              <ProviderCard
                history={this.props.history}
                provider={this.props.providers[el]}
                industry={this.props.industries[this.props.providers[el].industry]}
                key={idx}
              />
            ))
          ) : this.props.providers.all.length ? (
            this.props.providers.all
              .sort()
              .map((el, idx) => (
                <ProviderCard
                  history={this.props.history}
                  provider={this.props.providers[el]}
                  industry={this.props.industries[this.props.providers[el].industry]}
                  key={idx}
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
export default Providers;
