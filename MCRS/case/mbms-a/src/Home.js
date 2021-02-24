import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

class Home extends React.Component {
  state = {
    provider: {}
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/providers/company-a-ltd")
      .then(res => {
        this.setState({ provider: res.data });
        console.log(res.data);
        return res;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
  render() {
    return (
      <Container className="pb-5">
        <Row>
          <Col>
            <h1 className="pt-5 pb-3">Welcome</h1>
            <p>
              This is method base management system of Company A Ltd. Our
              company's profile information is listed below.
            </p>
            {this.state.provider && (
              <Card className="w-100">
                <Card.Body>
                  <Card.Title>{this.state.provider.name}</Card.Title>
                  <Card.Text>{this.state.provider.description}</Card.Text>
                  <Card.Text>
                    ID: {this.state.provider.id} <br />
                    E-mail: {this.state.provider.email}
                    <br />
                    Industry: {this.state.provider.industry}
                  </Card.Text>
                  {this.state.provider.contacts && (
                    <Card.Text>
                      Contacts:
                      <br />
                      {this.state.provider.contacts.map(e => (
                        <span key={e.email}>
                          {e.name}
                          <br />
                          {e.role}
                          <br />
                          {e.description}
                          <br />
                          {e.address}
                          <br />
                          {e.phone}
                          <br />
                          {e.email}
                        </span>
                      ))}
                    </Card.Text>
                  )}
                  {this.state.provider.urls && (
                    <Card.Text>
                      Useful Links:
                      <br />
                      {this.state.provider.urls.map(a => (
                        <a href={a.url}>{a.name || a.url}</a>
                      ))}
                    </Card.Text>
                  )}{" "}
                  {this.state.provider.relatedProviders && (
                    <Card.Text>
                      Related Companies:
                      <br />
                      {this.state.provider.relatedProviders.map(e => (
                        <span key={e} className="pl-4">
                          {e}
                          <br />
                        </span>
                      ))}
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
